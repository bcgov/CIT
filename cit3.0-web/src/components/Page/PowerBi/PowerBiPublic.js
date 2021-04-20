import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { Button as ButtonLink, Overlay } from "react-bootstrap";
import { models } from "powerbi-client";
import { useLocation } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import Config from "../../../Config";
import { toKebabCase } from "../../../helpers/helpers";
import useConfiguration from "../../../hooks/useConfiguration";

export default function PowerBi() {
  const configuration = useConfiguration();
  const [currentPage, setCurrentPage] = useState(null);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);
  const [embedToken, setEmbedToken] = useState(null);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdPublic;

  const { search } = useLocation();
  const [community] = useState(new URLSearchParams(search).get("community"));
  const [regionalDistrict] = useState(
    new URLSearchParams(search).get("regionalDistrict")
  );

  const [selected, setSelected] = useState("");
  const [places, setPlaces] = useState(null);

  const [createdUrl, setCreatedUrl] = useState("");
  const tooltip = useRef(null);
  const [showToolTip, setShowToolTip] = useState(false);

  const filter = () => {
    let result = null;
    if (community) {
      result = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "public pipeline_community",
          column: "Community Name",
        },
        operator: "In",
        values: [community.split("-").join(" ")],
      };
    } else if (regionalDistrict) {
      result = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "public pipeline_regionaldistrict",
          column: "Regional District",
        },
        operator: "In",
        values: [regionalDistrict.split("-").join(" ")],
      };
    }
    return result;
  };

  useEffect(() => {
    axios
      .get("/api/token/")
      .then((res) => {
        setToken(res.data.access_token);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setReportConfig(data.data);
        })
        .catch((err) => console.error("error in getting report config", err));
    }
  }, [token]);

  useEffect(() => {
    if (reportConfig) {
      axios
        .post(
          `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
          { accessLevel: "view" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setEmbedToken(data.data.token);
        });
    }
  }, [reportConfig]);

  useEffect(() => {
    axios.get("/api/opportunity/options").then((data) => {
      const commNames = data.data.communities.map((comm) => comm.place_name);
      const regNames = data.data.regionalDistricts.map((dist) => dist.name);
      setPlaces([...commNames, ...regNames]);
    });
  }, []);

  const saveAsPDF = () => {
    window.report.print();
  };

  const createAndCopyLinkToClipboard = () => {
    const url = `${configuration.baseUrl}/cit-dashboard/public/${toKebabCase(
      selected
    )}`;
    setCreatedUrl(url);
    const el = document.createElement("textarea");
    el.value = url;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShowToolTip(true);
    setTimeout(() => {
      setShowToolTip(false);
    }, 3000);
  };

  return embedToken ? (
    <div id="embed-container">
      <div className="no-print cit-header">
        {selected}
        <ButtonLink
          variant="link"
          className="text-white mr-5"
          onClick={saveAsPDF}
        >
          Save As PDF
        </ButtonLink>
        {places ? (
          <>
            <Typeahead
              id="typeahead"
              className="ml-3 mr-3"
              onChange={(selectedPlace) => {
                setSelected(selectedPlace[0]);
              }}
              value={selected}
              placeholder="Community name"
              options={places}
            />
            <button
              disabled={!selected}
              ref={tooltip}
              type="button"
              className="copy-btn btn primary"
              onClick={createAndCopyLinkToClipboard}
            >
              Copy Link
            </button>
            <Overlay
              target={tooltip.current}
              show={showToolTip}
              placement="top"
            >
              {({ placement, arrowProps, show: _show, popper, ...props2 }) => (
                <div
                  {...props2}
                  style={{
                    backgroundColor: "#a3c4f5",
                    padding: "2px 10px",
                    color: "white",
                    borderRadius: 3,
                    ...props2.style,
                  }}
                >
                  Copied to clipboard: {createdUrl}
                </div>
              )}
            </Overlay>
          </>
        ) : null}
      </div>
      <PowerBIEmbed
        embedConfig={{
          type: "report",
          id: reportConfig.id,
          embedUrl: reportConfig.embedUrl,
          accessToken: embedToken,
          tokenType: models.TokenType.Embed,
          pageName: currentPage || "",
          settings: {
            panes: {
              filters: {
                visible: true,
              },
              pageNavigation: {
                visible: true,
              },
            },
          },
        }}
        // Define event handlers
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                window.report
                  .getPages()
                  .then((data) => {
                    const commReport = data.filter(
                      (report) => report.displayName === "Community Overview"
                    );
                    if (commReport[0].name !== currentPage) {
                      window.report
                        .setPage(commReport[0].name)
                        .catch((err) => console.log("setpage error:", err));
                      if (filter()) {
                        window.report
                          .setFilters([filter()])
                          .catch((err) => console.log("error: ", err));
                      }
                      window.report.refresh();
                    }
                  })
                  .catch((err) => console.log("error: ", err));
              },
            ],
            [
              "error",
              function (event) {
                console.log("ERROR:::", event.detail);
              },
            ],
            [
              "pageChanged",
              function (event) {
                if (currentPage !== event.detail.newPage.name) {
                  setCurrentPage(event.detail.newPage.name);
                  setCurrentPageData(event.detail.newPage);
                }
              },
            ],
          ])
        }
        // // Add CSS classes to the div element
        cssClassName="report-style-class"
        // set report object
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  ) : null;
}
