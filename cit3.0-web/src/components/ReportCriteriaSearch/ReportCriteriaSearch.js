import React, { useState, useEffect } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import Config from "../../Config";
import "./ReportCriteriaSearch.css";

export default function ReportCriteriaSearch() {
  const [report, setReport] = useState(null);
  const [token, setToken] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdSearch;

  const layoutSettings = {
    layoutType: models.LayoutType.Custom,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Custom,
        width: "100%",
        height: "100%",
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
    ["loaded", function () {}],
    ["rendered", function () {}],
    [
      "error",
      function (event) {
        if (event) {
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
    setShowReport(true);
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

  return (
    <>
      {showReport && (
        <PowerBIEmbed
          embedConfig={embedReportConfig}
          eventHandlers={eventHandlersMap}
          cssClassName="report-criteria-search-container"
          getEmbeddedComponent={(embedObject) => {
            setReport(embedObject);
          }}
        />
      )}
    </>
  );
}

ReportCriteriaSearch.propTypes = {};

ReportCriteriaSearch.defaultProps = {};
