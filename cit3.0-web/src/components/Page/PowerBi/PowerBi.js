import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useLocation } from "react-router-dom";
import { Button } from "shared-components";
import Config from "../../../Config";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState(null);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const [embedToken, setEmbedToken] = useState(null);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportId;

  const { search } = useLocation();
  const [community, setCommunity] = useState(
    new URLSearchParams(search).get("community")
  );
  const [regionalDistrict, setRegionalDistrict] = useState(
    new URLSearchParams(search).get("regionalDistrict")
  );

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
        values: [community],
      };
    } else if (regionalDistrict) {
      result = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "public pipeline_regionaldistrict",
          column: "Regional District",
        },
        operator: "In",
        values: [regionalDistrict],
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
          console.log("get report config:", data.data);
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

  const saveAsPDF = () => {
    window.report.print();
  };

  return embedToken ? (
    <div id="embed-container">
      <Button
        styling="bcgov-normal-blue btn primary over"
        label="Save As PDF"
        onClick={saveAsPDF}
      />
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
                    console.log("pages: ", data);
                    const commReport = data.filter(
                      (report) => report.displayName === "Community Overview"
                    );
                    if (commReport[0].name !== currentPage) {
                      window.report
                        .setPage(commReport[0].name)
                        .catch((err) => console.log("setpage error:", err));
                      if (filter()) {
                        window.report
                          .setFilters([filter])
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
                console.log("pageChanged: ", event.detail);
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
