import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const [embedToken, setEmbedToken] = useState(null);

  const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;
  const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;

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
        .catch((err) => console.error(err));
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

  return embedToken ? (
    <>
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: reportConfig.id,
          embedUrl: reportConfig.embedUrl,
          accessToken: embedToken,
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                visible: false,
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
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
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
                const pageName = event.detail.newPage.displayName;
                // console.log(event.detail);
                // console.log(pageName);
                setCurrentPage(event.detail.newPage.displayName);
              },
            ],
          ])
        }
        // // Add CSS classes to the div element
        cssClassName="report-style-class"
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </>
  ) : null;
}
