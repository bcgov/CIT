import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PowerBi.css";
import {
  Button as ButtonLink,
  Overlay,
  Modal,
  Container,
  Row,
  Card,
} from "react-bootstrap";
import { Button as SharedButton } from "shared-components";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import Config from "../../../Config";
import { trackUser } from "../../../store/actions/user";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

export default function PowerBi() {
  const keycloak = useKeycloakWrapper();
  const user = useSelector((state) => state.user);
  const configuration = useConfiguration();
  const [currentPage, setCurrentPage] = useState(null);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const location = useLocation();

  const [embedToken, setEmbedToken] = useState(null);

  const groupId = Config.pbiGroupId;

  const compareRoute = "/compare-area";
  const isCompareArea = window.location.pathname.includes(compareRoute);

  const criteriaRoute = "/criteria-search";
  const isCriteriaSearch = window.location.pathname.includes(criteriaRoute);

  let reportId = location.pathname.includes("public")
    ? Config.pbiReportIdPublic
    : Config.pbiReportIdInternal;

  if (isCompareArea) reportId = Config.pbiReportIdCompare;
  if (isCriteriaSearch) reportId = Config.pbiReportIdSearch;

  const [isEconomicPageVisible, setIsEconomicPageVisible] = useState(null);
  const [isSocialPageVisible, setIsSocialPageVisible] = useState(null);
  const [isAssetsPageVisible, setIsAssetsPageVisible] = useState(null);
  const [
    isCommunityOverviewPageVisible,
    setIsCommunityOverviewPageVisible,
  ] = useState(null);

  const [community, setCommunity] = useState("");
  const [regionalDistrict, setRegionalDistrict] = useState("");

  // set communities and regional districts to be able to find the type of place
  const [communities, setCommunities] = useState(null);
  const [regional, setRegional] = useState(null);

  const [createdUrl, setCreatedUrl] = useState("");
  const [selected, setSelected] = useState("");

  const [places, setPlaces] = useState(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const tooltip = useRef(null);

  const searchRoute = "/search-communities";
  const [setPage, setSetPage] = useState(
    window.location.pathname.includes(searchRoute)
  );

  // Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelected(false);
  };

  const typeOfSelected = (place) => {
    if (communities.find((c) => c.toLowerCase() === place)) {
      return "community";
    }
    if (regional.find((r) => r.toLowerCase() === place)) {
      return "regionalDistrict";
    }
    return null;
  };

  const getPlaceFromUrl = () => {
    if (window.location.pathname.includes(searchRoute)) {
      return false;
    }
    const path = window.location.pathname.split("/");
    if (
      path.includes("public") &&
      path.findIndex((word) => word === "public") !== path.length - 1
    ) {
      const place = decodeURIComponent(path[path.length - 1]);
      const type = typeOfSelected(place);
      if (type === "community") {
        setCommunity(place);
      } else if (type === "regionalDistrict") {
        setRegionalDistrict(place);
      }
    }
    return null;
  };

  const filterTest = () => {
    const result = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        column: "Census Subdivision Name",
        table: "public pipeline_cen_prof_detailed_csd_attrs_sp",
      },
      operator: "In",
      values: ["Abbotsford"],
    };
    return result;
  };

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
      setCommunities(commNames);
      const regNames = data.data.regionalDistricts.map((dist) => dist.name);
      setRegional(regNames);
      setPlaces([...commNames, ...regNames]);
    });
  }, []);

  useEffect(() => {
    if (communities && regional) {
      getPlaceFromUrl();
    }
  }, [communities, regional]);

  const saveAsPDF = () => {
    window.report.getFilters().then((data) => console.log(data));
    window.report.print();
  };

  const createAndCopyLinkToClipboard = () => {
    const url = `${
      configuration.baseUrl
    }/cit-dashboard/public/${encodeURIComponent(selected.toLowerCase())}`;
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

  const powerBiEventHandlers = new Map([
    [
      "loaded",
      function () {
        window.report
          .getPages()
          .then((data) => {
            // const visuals = data[0].getVisuals().then((v) => {
            //   const myVisuals = v;
            //   console.log(myVisuals);
            // });
            const commReport = data.filter(
              (report) => report.displayName === "Community Overview"
            );
            const criteria = data.filter(
              (report) => report.displayName === "Criteria Search"
            );
            const compareReport = data.filter(
              (report) => report.displayName === "Economic"
            );

            if (isCriteriaSearch) {
              window.report
                .setPage(criteria[0].name)
                .catch((err) => console.log("setpage error:", err));
            } else if (isCompareArea) {
              window.report
                .setPage(compareReport[0].name)
                .catch((err) => console.log("setpage error:", err));
            } else if (community || regionalDistrict || setPage) {
              if (commReport[0].name !== currentPage) {
                window.report
                  .setPage(commReport[0].name)
                  .catch((err) => console.log("setpage error:", err));
                if (filter()) {
                  window.report
                    .setFilters([filter()])
                    .catch((err) => console.log("error: ", err));
                }
              }
            } else if (criteria[0].name !== currentPage) {
              window.report
                .setPage(criteria[0].name)
                .catch((err) => console.log("setpage error:", err));
              if (filter()) {
                window.report
                  .setFilters([filter()])
                  .catch((err) => console.log("error: ", err));
              }
            }
            window.report.refresh();
            if (reportId === Config.pbiReportIdInternal) {
              trackUser(
                {
                  user_id: user.id,
                  report_url: window.location.href,
                },
                keycloak.obj.token
              );
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
        window.report.getFilters().then((data) => console.log(data));
        if (currentPage !== event.detail.newPage.name) {
          setCurrentPage(event.detail.newPage.name);
          setCurrentPageData(event.detail.newPage);
        }
      },
    ],
  ]);
  const eventHandlersMap = new Map([
    [
      "loaded",
      function () {
        console.log("Report has loaded");
      },
    ],
    [
      "rendered",
      function () {
        console.log("Report has rendered");
      },
    ],
    [
      "error",
      function (event) {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
  ]);
  const economicEventHandlers = new Map([
    [
      "loaded",
      function () {
        console.log("economic loaded");
        if (filterTest()) {
          console.log("economic loaded filter");
          window.report
            .setFilters([filterTest()])
            .catch((err) => console.log("error: ", err));
        }
        window.report.getPages().then((data) => {
          console.log("economic loaded data");
        });
      },
    ],
    [
      "filtersApplied",
      function () {
        console.log("filtersApplied");
        window.report
          .getFilters()
          .then((data) => console.log("filters applied", data));
      },
    ],
  ]);

  const socialEventHandlers = new Map([
    [
      "loaded",
      function () {
        console.log("social loaded");
        if (filterTest()) {
          console.log("social loaded filter");
          window.report
            .setFilters([filterTest()])
            .catch((err) => console.log("error: ", err));
        }
        window.report.getPages().then((data) => {
          const reportFilter = data.find(
            (r) => r.displayName === "Duplicate of Social"
          );
          if (reportFilter) {
            window.report.setFilters([filter()]);
            window.report
              .setPage(reportFilter.name)
              .catch((err) => console.log("setpage error:", err));
          }
        });
      },
    ],
    [
      "filtersApplied",
      function () {
        console.log("filtersApplied");
        // window.report
        // .getFilters()
        // .then((data) => console.log("filters applied", data));
      },
    ],
  ]);

  const powerBiSettings = {
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  };

  const powerBiSettingsLayout = {
    layoutType: models.LayoutType.Custom,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Custom,
        width: 1280,
        height: 190,
      },
      displayOption: models.DisplayOption.FitToWidth,
    },
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  };

  return embedToken && places ? (
    <>
      <div id="embed-container">
        <div className="no-print cit-header">
          <ButtonLink
            variant="link"
            className="text-white mr-5"
            onClick={saveAsPDF}
          >
            Save As PDF
          </ButtonLink>
          <button
            type="button"
            className="copy-btn btn primary"
            onClick={handleShow}
          >
            Create URL to a Community
          </button>
        </div>
        <br />
        <Container>
          {isCompareArea && (
            <>
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={socialEventHandlers}
                  cssClassName="report-compare report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
            </>
          )}
          {isCriteriaSearch && (
            <>
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={economicEventHandlers}
                  cssClassName="report-criteria-search report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
            </>
          )}
          {!isCompareArea && !isCriteriaSearch && (
            <>
              {
                ""
                // 1. census
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSectionf24405d55f47f20b64ac",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-census report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
              {
                ""
                // 2. connectivity
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSection3a82bd236c8333e0318f",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-connectivity report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
              {
                ""
                // 3. Economic
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSection42cfd715841cc0ee8562",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-economic report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
              {
                ""
                // 4. Social
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSection046e168ffc92218874fc",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-social report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
              {
                ""
                // 5. Assets & Infrastructure
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSectiona8fb2e2a05ee64729e48",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-assets report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
              {
                ""
                // 6. BC Assessment
              }
              <Row>
                <PowerBIEmbed
                  embedConfig={{
                    type: "report",
                    id: reportConfig.id,
                    embedUrl: reportConfig.embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    pageName: "ReportSectionef1d1d41b06063001cb3",
                    settings: { ...powerBiSettings },
                  }}
                  eventHandlers={powerBiEventHandlers}
                  cssClassName="report-bca-assessment report-iframe"
                  getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                  }}
                />
              </Row>
            </>
          )}
        </Container>
      </div>
      <Modal
        show={show}
        centered
        onHide={handleClose}
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Create a URL to Your Community</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {places ? (
            <Container>
              <Row>
                <h3>
                  Select a community or regional district to create a URL to
                  this page:
                </h3>
              </Row>
              <Row className="d-flex my-4">
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
                  {({
                    placement,
                    arrowProps,
                    show: _show,
                    popper,
                    ...props2
                  }) => (
                    <div
                      {...props2}
                      style={{
                        backgroundColor: "#a3c4f5",
                        padding: "5px 10px",
                        marginTop: "10px",
                        color: "white",
                        borderRadius: 3,
                        zIndex: 10099,
                        ...props2.style,
                      }}
                    >
                      Copied to clipboard: {createdUrl}
                    </div>
                  )}
                </Overlay>
              </Row>
            </Container>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <SharedButton
            label="Close"
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}
