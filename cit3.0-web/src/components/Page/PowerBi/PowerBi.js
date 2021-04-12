import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useLocation } from "react-router-dom";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const [embedToken, setEmbedToken] = useState(null);

  const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;
  const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;

  const { search } = useLocation();
  const [community, setCommunity] = useState(
    new URLSearchParams(search).get("community")
  );

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
          pageName: currentPage,
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
                console.log("Report loaded");
                window.report
                  .getPages("Communities Overview")
                  .then((data) => {
                    const commReport = data.filter(
                      (report) => report.displayName === "Community Overview"
                    );
                    if (commReport[0].name !== currentPage) {
                      setCurrentPage(commReport[0].name);
                      window.report
                        .setPage(commReport[0].name)
                        .catch((err) => console.log("setpage error:", err));
                      const filter = {
                        $schema: "http://powerbi.com/product/schema#basic",
                        target: {
                          table: "public pipeline_community",
                          column: "Community Name",
                        },
                        operator: "In",
                        values: [community],
                      };
                      window.report
                        .setFilters([filter])
                        .then((data1) => console.log(data1))
                        .catch((err) => console.log("error: ", err));
                      window.report.refresh();
                    }
                  })
                  .catch((err) => console.log("error: ", err));
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
                // const pageName = event.detail.newPage.displayName;
                // console.log(event.detail);
              },
            ],
          ])
        }
        // // Add CSS classes to the div element
        cssClassName="report-style-class"
        getEmbeddedComponent={(embeddedReport) => {
          console.log("getreport");
          window.report = embeddedReport;
        }}
      />
    </>
  ) : null;
}
