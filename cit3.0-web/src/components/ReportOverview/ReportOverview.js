import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Printer } from "react-bootstrap-icons";
import Config from "../../Config";
import "./ReportOverview.css";

export default function ReportOverview({ reportFilter }) {
  const [report, setReport] = useState();
  const [token, setToken] = useState("");
  const [showReport, setShowReport] = useState(false);

  const groupId = Config.pbiGroupId;
  const reportId = Config.pbiReportIdPublic;
  const [activePage, setActivePage] = useState("Connectivity");

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

  const printSettings = {
    layoutType: models.LayoutType.Printer,
    panes: {
      filters: {
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
  };

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
    if (filter && filter.zoneName) {
      const zoneNameFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          column: "zone_name",
          table: "Region Distribution",
        },
        operator: "In",
        values: [filter.zoneName],
      };
      zoneFilter.push(zoneNameFilter);
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
    if (!report) return;
    setActivePage(displayName);
    const pages = await report.getPages();
    const newPage = pages.find((page) => page.displayName === displayName);

    if (newPage) {
      report.setPage(newPage.name);
    }
  };

  const setReportFilter = async () => {
    if (!report) return;
    const filter = getReportFilter(reportFilter);

    await report.setFilters(filter);
  };

  const handlePrint = async () => {
    if (!report) return;
    const pages = await report.getPages();
    console.log(pages);
    const reportPage = pages.find((page) => page.displayName === "Print");

    if (reportPage) {
      await report.setPage(reportPage.name);
      await report.print();
    }

    await setPage(activePage);
  };

  const reportButtons = (
    <div className="d-flex justify-content-center report-buttons my-4">
      {reportTabs.map((tab) => (
        <Button
          key={tab.pageName}
          type="Button"
          variant={tab.pageName === activePage ? "primary" : "warning"}
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
    if (token) loadReport();
  }, [token, reportFilter]);

  useEffect(() => {
    const defaultPage = reportTabs.find((tab) => tab.isDefault);
    if (defaultPage) setPage(defaultPage.pageName);
  }, [showReport]);

  const printButton = (
    <div className="d-flex flex-row-reverse my-2 print-container">
      <Button type="button" variant="light" onClick={handlePrint}>
        <Printer /> Print
      </Button>
    </div>
  );

  return (
    <>
      <div>
        {showReport && (
          <>
            <div>{reportButtons}</div>
            <div>{printButton}</div>
          </>
        )}

        <div className="powerbi-container">
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
    </>
  );
}

ReportOverview.propTypes = {
  reportFilter: PropTypes.objectOf(PropTypes.any),
};

ReportOverview.defaultProps = {
  reportFilter: null,
};
