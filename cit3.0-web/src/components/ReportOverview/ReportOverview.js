import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Button, Modal, Toast } from "react-bootstrap";
import { Printer, LockFill } from "react-bootstrap-icons";
import { useKeycloakWrapper } from "../../hooks/useKeycloakWrapper";
import Roles from "../../constants/roles";
import Config from "../../Config";
import useConfiguration from "../../hooks/useConfiguration";
import "./ReportOverview.css";

let reportId = Config.pbiReportIdPublic;
export default function ReportOverview({ reportFilter, user, handleLogin }) {
  const BcGovUser = "BCGOV";

  const keycloak = useKeycloakWrapper();
  const configuration = useConfiguration();

  const reportUrl = useRef();

  const [report, setReport] = useState();
  const [token, setToken] = useState("");
  const [showReport, setShowReport] = useState(false);

  const [show, setShow] = useState(false);
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCloseCopyUrl = () => setShowCopyUrl(false);

  const [modalInfo, setModalInfo] = useState("");

  const groupId = Config.pbiGroupId;

  const [activePage, setActivePage] = useState("Connectivity");

  const [isLoginWithIdir] = useState(keycloak.idp === "idir");

  const [isInternalAuthorized] = useState(isLoginWithIdir);

  const reportTabs = [
    {
      pageName: "Connectivity",
      label: "Connectivity",
      isLoginRequired: null,
      isDefault: true,
    },
    {
      pageName: "Assets & Infrastructure",
      label: "Facilities",
      isLoginRequired: null,
      isDefault: null,
    },
    {
      pageName: "Economic",
      label: "Economic",
      isLoginRequired: null,
      isDefault: null,
    },
    {
      pageName: "Social",
      label: "Social",
      isLoginRequired: null,
      isDefault: null,
    },
    {
      pageName: "BC Assessment",
      label: "BC Assessment",
      isLoginRequired: true,
      isDefault: null,
    },
  ];

  const layoutSettings = {
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  };

  const inititalReportConfig = {
    type: "report",
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: { ...layoutSettings },
  };

  const [embedReportConfig, setEmbedReportConfig] = useState(
    inititalReportConfig
  );

  const getReportConfig = async () => {
    const response = await axios.get(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const getReportToken = async () => {
    const response = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
      { accessLevel: "view" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.token;
  };

  const eventHandlersMap = new Map([
    [
      "loaded",
      function reportLoaded() {
        setShowReport(true);
      },
    ],
    ["rendered", function reportRendered() {}],
    [
      "error",
      function reportErrored(event) {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
  ]);

  const getReportFilter = (filter) => {
    const zoneFilter = [];
    if (filter && filter.zoneType) {
      const zoneTypeFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          column: "zone_type",
          table: "Region Distribution",
        },
        operator: "In",
        values: [filter.zoneType],
      };
      zoneFilter.push(zoneTypeFilter);
    }
    if (filter && filter.zoneId) {
      const zoneIdFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          column: "zone_id",
          table: "Region Distribution",
        },
        operator: "In",
        values: [String(filter.zoneId)],
      };
      zoneFilter.push(zoneIdFilter);
    }

    if (filter && filter.zoneName) {
      const zoneIdFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          column: "zone_name",
          table: "Region Distribution",
        },
        operator: "In",
        values: [String(filter.zoneName)],
      };
      zoneFilter.push(zoneIdFilter);
    }

    return zoneFilter;
  };

  const loadReport = async () => {
    const reportConfig = await getReportConfig();
    const reportToken = await getReportToken();
    const filter = getReportFilter(reportFilter);

    setEmbedReportConfig({
      ...embedReportConfig,
      id: reportConfig.id,
      filters: filter,
      embedUrl: reportConfig.embedUrl,
      accessToken: reportToken,
    });
  };

  const setPage = async (displayName) => {
    if (reportId !== Config.pbiReportIdPublic) {
      reportId = Config.pbiReportIdPublic;
      await loadReport();
    }

    if (!report) return;
    setActivePage(displayName);
    const pages = await report.getPages();
    const newPage = pages.find((page) => page.displayName === displayName);

    if (newPage) {
      report.setPage(newPage.name);
    }
  };

  const handleCopyUrl = () => {
    const url = `${
      configuration.baseUrl
    }/cit-dashboard/info/${encodeURIComponent(
      reportFilter.zoneType.toLowerCase().replace(" ", "-")
    )}/${reportFilter.zoneId}`;

    reportUrl.current = url;

    const el = document.createElement("textarea");
    el.value = url;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShowCopyUrl(true);
  };

  const handlePrint = async () => {
    if (report) {
      await report.print();
    }
  };

  const handleBcaReport = async (displayName) => {
    if (!isLoginWithIdir) {
      setModalInfo({
        title: "Login Required",
        body:
          "Please note that you must be logged in with an IDIR and have approved permission to continue with BC Assessment Report",
      });
      handleShow();
      return;
    }

    if (isLoginWithIdir) {
      reportId = Config.pbiReportIdInternal;
      await loadReport();
      setActivePage(displayName);
      return;
    }

    handleShow();
  };

  const reportButtons = (
    <div className="d-flex justify-content-left btn-group report-buttons m-0 p-0">
      {reportTabs
        .filter((t) => !t.isLoginRequired)
        .map((tab) => (
          <Button
            key={tab.pageName}
            type="Button"
            variant={tab.pageName === activePage ? "primary" : "warning"}
            onClick={() => setPage(tab.pageName)}
          >
            {tab.label}
          </Button>
        ))}
      {user === BcGovUser &&
        reportTabs
          .filter((t) => t.isLoginRequired)
          .map((tab) => (
            <Button
              key={tab.pageName}
              type="Button"
              variant={tab.pageName === activePage ? "primary" : "warning"}
              onClick={() => handleBcaReport(tab.pageName)}
            >
              {tab.label} {!isInternalAuthorized && <LockFill />}
            </Button>
          ))}
    </div>
  );

  useEffect(() => {
    async function getToken() {
      const response = await axios.get("/api/token/");
      setToken(response.data.access_token);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (token) loadReport();
  }, [token, reportFilter]);

  useEffect(() => {
    const defaultPage = reportTabs.find((tab) => tab.isDefault);
    if (defaultPage) setPage(defaultPage.pageName);
  }, [showReport]);

  const otherButtons = (
    <div className="d-flex flex-row-reverse my-2 print-container">
      <Button
        type="button"
        variant="light px-2 mx-1 rounded"
        onClick={handlePrint}
      >
        <Printer /> Print
      </Button>
      {reportFilter && reportFilter.zoneLabel && (
        <Button
          type="button"
          variant="light px-2 rounded"
          onClick={handleCopyUrl}
        >
          Copy link
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div>
        <div className="powerbi-container">
          <div className="tabs-container">
            {showReport && (
              <>
                <div className="tabs-container-button">{reportButtons}</div>
                <div>{otherButtons}</div>
              </>
            )}
          </div>
          <PowerBIEmbed
            embedConfig={embedReportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName="report-overview-container"
            getEmbeddedComponent={(embedObject) => {
              setReport(embedObject);
            }}
          />
        </div>
      </div>
      <div>
        <Modal
          show={show}
          centered
          onHide={handleClose}
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{modalInfo.title}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="my-2">{modalInfo.body}</h4>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              variant="outline-primary"
              className="user-story-button mr-auto"
              onClick={handleClose}
            >
              Cancel
            </Button>
            {!isLoginWithIdir && (
              <Button
                type="button"
                variant="primary"
                className="user-story-button ml-auto"
                onClick={handleLogin}
              >
                Login with IDIR
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showCopyUrl}
          centered
          onHide={handleCloseCopyUrl}
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>CIT Link</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="my-2">
              {reportFilter && reportFilter.zoneLabel} CIT link copied to
              clipboard.
            </h3>
            <small>{reportUrl.current}</small>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="outline-primary"
              className="user-story-button mr-auto"
              onClick={handleCloseCopyUrl}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

ReportOverview.propTypes = {
  reportFilter: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.string,
  handleLogin: PropTypes.func,
};

ReportOverview.defaultProps = {
  reportFilter: null,
  user: null,
  handleLogin: null,
};
