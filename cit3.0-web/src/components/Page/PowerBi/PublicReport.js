import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Container, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Config from "../../../Config";
import "./PowerBi.css";

export default function PublicReport() {
  const [report, setReport] = useState();
  const [token, setToken] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [isReportLoaded, SetIsReportLoaded] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdPublic;

  const [tabValue, setTabValue] = useState("Connectivity");

  const reportTabs = [
    {
      pageName: "Connectivity",
      label: "Connectivity",
      isLoginRequired: null,
      isDefault: true,
    },
    {
      pageName: "Assets & Infrastructure",
      label: "Infrastructure",
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
  ];

  const layoutSettings = {
    layoutType: models.LayoutType.Custom,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Custom,
        width: 1200,
        height: "100%",
      },
      displayOption: models.DisplayOption.FitToPage,
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
    [
      "loaded",
      function () {
        SetIsReportLoaded(true);
      },
    ],
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

  const setPage = async (pageName) => {
    if (!report) return;
    setTabValue(pageName);
    const pages = await report.getPages();
    const newPage = pages.find((page) => page.displayName === pageName);

    if (newPage) {
      report.setPage(newPage.name);
    }
  };

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const querystring = useQuery();

  const reportFilter = () => {
    const regionalDistrictsFilter = querystring.get("regionaldistricts");

    if (!regionalDistrictsFilter || regionalDistrictsFilter.length === 0)
      return null;

    const zoneType = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        column: "zone_type",
        table: "Region Distribution",
      },
      operator: "In",
      values: [],
    };

    zoneType.values = ["Regional Districts"];

    const zoneName = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        column: "zone_name",
        table: "Region Distribution",
      },
      operator: "In",
      values: [],
    };

    zoneName.values = regionalDistrictsFilter.split(",");

    return [zoneType, zoneName];
  };

  const setReportFilter = async () => {
    if (!report) return;

    await report.setFilters(reportFilter());
  };

  const reportButtons = (
    <div className="d-flex justify-content-center report-buttons my-4">
      {reportTabs.map((tab) => (
        <Button
          type="Button"
          variant={tab.pageName === tabValue ? "primary" : "warning"}
          onClick={() => setPage(tab.pageName)}
        >
          {tab.label}
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
    loadReport();
  }, [token]);

  useEffect(() => {
    const defaultPage = reportTabs.find((tab) => tab.isDefault);
    if (defaultPage) setPage(defaultPage.pageName);
    setReportFilter();
  }, [isReportLoaded]);

  return (
    <>
      <Container className={showReport ? "" : "hide-section"} fluid>
        {reportButtons}
        <PowerBIEmbed
          embedConfig={embedReportConfig}
          eventHandlers={eventHandlersMap}
          cssClassName="report-container report-iframe"
          getEmbeddedComponent={(embedObject) => {
            setReport(embedObject);
          }}
        />
      </Container>
    </>
  );
}
