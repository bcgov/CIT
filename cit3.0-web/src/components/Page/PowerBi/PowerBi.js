import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  // const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;
  // const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;

  const groupId = "0399d295-4354-4955-8ed9-68709eb5e7b5";
  // const reportId = "1d7ba97a-514e-4fd4-932c-9f4e535c60b8";

  // cit2.0
  const reportId = "ef9fbbd5-63c7-45e8-b9cf-97fc12319be1";

  // sample
  // const reportId = "09b1aef6-4987-4f99-810d-83c8e28ffc6d";

  useEffect(() => {
    axios
      .get("/api/token")
      .then((res) => {
        console.log(res.data.access_token);
        setToken(res.data.access_token);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log("HERE");
    axios
      .get(
        `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        setReportConfig(data.data);
        console.log("DATA", data);
      })
      .catch((err) => console.error(err));
  }, [token]);
  console.log("reportConfig", reportConfig);
  return reportConfig ? (
    <PowerBIEmbed
      embedConfig={{
        type: "report", // Supported types: report, dashboard, tile, visual and qna
        // id: reportConfig.id,
        ...reportConfig,
        // embedUrl: `${reportConfig.embedUrl}`,
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
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  ) : null;
  // ) : (
  //   <iframe
  //     width="1140"
  //     height="541.25"
  //     src="https://app.powerbi.com/reportEmbed?reportId=1d7ba97a-514e-4fd4-932c-9f4e535c60b8&autoAuth=true&ctid=6fdb5200-3d0d-4a8a-b036-d3685e359adc&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWNhbmFkYS1jZW50cmFsLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"
  //     frameBorder="0"
  //     allowFullScreen="true"
  //     title="communityInsights"
  //   />
  // );
}
