import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Config from "../../../Config";
import "./PowerBi.css";

export default function PublicReport() {
  const [report, setReport] = useState();
  const [token, setToken] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [isReportLoaded, SetIsReportLoaded] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdPublic;

  const reportTabs = [
    {
      pageName: "Connectivity",
      label: "Connectivity",
      isLoginRequired: null,
      isDefault: null,
    },
    {
      pageName: "Assets & Infrastructure",
      label: "Assets and Insfrastracture",
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
      pageName: "Census",
      label: "Census",
      isLoginRequired: null,
      isDefault: true,
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
    layoutType: models.LayoutType.Custom,
    customLayout: {
      pageSize: {
        type: models.PageSizeType.Custom,
        width: 1280,
      },
      displayOption: models.DisplayOption.FitToWidth,
    },
    panes: {
      filters: {
        visible: true,
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
    const reportConfigResponse = await axios.get(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return reportConfigResponse.data;
  };

  const getReportToken = async () => {
    const reportToken = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
      { accessLevel: "view" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return reportToken.data.token;
  };

  const eventHandlersMap = new Map([
    [
      "loaded",
      function () {
        console.log("Report has loaded");
        SetIsReportLoaded(true);
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
    if (!report) {
      console.log("Report not available", pageName);
      return;
    }
    const pages = await report.getPages();
    const newPage = pages.find((page) => page.displayName === pageName);

    if (newPage) {
      report.setPage(newPage.name);
    }
  };

  const setFilter = (table, column, filterValues) => {
    const result = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table,
        column,
      },
      operator: "In",
      values: filterValues,
    };
    return result;
  };

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const querystring = useQuery();

  const reportSection = querystring.get("powerbi")
    ? querystring.get("powerbi")
    : "";

  const zoneFilter = () => {
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

    const newFilters = [zoneType, zoneName];

    return newFilters;
  };

  const setReportFilter = async () => {
    if (!report) {
      console.log("Report not available");
      return;
    }
    await report.setFilters(zoneFilter());
  };

  const reportButtons = (
    <div className="d-flex justify-content-center report-buttons my-4">
      {reportTabs.map((tab) => (
        <Button type="Button" onClick={() => setPage(tab.pageName)}>
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
      <div className={showReport ? "" : "hide-section"}>
        {reportButtons}
        <PowerBIEmbed
          embedConfig={embedReportConfig}
          eventHandlers={eventHandlersMap}
          cssClassName="report-style"
          getEmbeddedComponent={(embedObject) => {
            setReport(embedObject);
          }}
        />
      </div>
    </>
  );
}
