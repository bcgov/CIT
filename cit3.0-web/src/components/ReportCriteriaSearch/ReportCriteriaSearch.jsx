import React, { useState, useEffect } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { Printer } from "react-bootstrap-icons";
import Config from "../../Config";
import "./ReportCriteriaSearch.css";

export default function ReportCriteriaSearch() {
  const [report, setReport] = useState(null);
  const [token, setToken] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isPrintLoading] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdSearch;

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
    [
      "rendered",
      function reportRendered(e) {
        // eslint-disable-next-line no-console
        console.error(e);
      },
    ],
    [
      "error",
      function reportErrored(event) {
        if (event) {
          // eslint-disable-next-line no-console
          console.error(event.detail);
        }
      },
    ],
  ]);

  const loadReport = async () => {
    const reportConfig = await getReportConfig();
    const reportToken = await getReportToken();

    setEmbedReportConfig({
      ...embedReportConfig,
      id: reportConfig.id,
      embedUrl: reportConfig.embedUrl,
      accessToken: reportToken,
    });
  };

  const handlePrint = async () => {
    if (report) {
      await report.print();
    }
  };

  useEffect(() => {
    async function getToken() {
      const response = await axios.get("/api/token/");
      setToken(response.data.access_token);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (token) loadReport();
  }, [token]);

  const printButton = (
    <div className="d-flex flex-row-reverse my-2 print-container">
      <Button type="button" variant="light px-2 rounded" onClick={handlePrint}>
        <Printer /> Print
      </Button>
    </div>
  );

  return (
    <>
      <div>
        {isPrintLoading && (
          <>
            <div className="center-spinner">
              <Spinner animation="border" />
            </div>
          </>
        )}
        {showReport && (
          <>
            <div>{printButton}</div>
          </>
        )}
        <div className="powerbi-container">
          <PowerBIEmbed
            embedConfig={embedReportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName="report-criteria-search-container"
            getEmbeddedComponent={(embedObject) => {
              setReport(embedObject);
            }}
          />
        </div>
      </div>
    </>
  );
}

ReportCriteriaSearch.propTypes = {};

ReportCriteriaSearch.defaultProps = {};
