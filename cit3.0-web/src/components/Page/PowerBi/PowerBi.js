import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);

  const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;
  const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;

  useEffect(() => {
    axios
      .get("/api/token")
      .then((res) => {
        setToken(res.data.access_token);
      })
      .catch((err) => console.error(err));
  }, []);

  return token ? (
    <PowerBIEmbed
      embedConfig={{
        type: "report", // Supported types: report, dashboard, tile, visual and qna
        id: reportId,
        embedUrl: `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
        accessToken: token,
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
              console.log(event.detail);
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
      // Add CSS classes to the div element
      cssClassName="report-style-class"
    />
  ) : null;
}
