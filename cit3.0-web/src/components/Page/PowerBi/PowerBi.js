import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useLocation } from "react-router-dom";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState(null);
  // const [currentPageData, setCurrentPageData] = useState(null);
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const [embedToken, setEmbedToken] = useState(null);

  const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;
  const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;

  const { search } = useLocation();
  const [community, setCommunity] = useState(
    new URLSearchParams(search).get("community")
  );
  const [regionalDistrict, setRegionalDistrict] = useState(
    new URLSearchParams(search).get("regionalDistrict")
  );

  const filter = community
    ? {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "public pipeline_community",
          column: "Community Name",
        },
        operator: "In",
        values: [community],
      }
    : {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "public pipeline_regionaldistrict",
          column: "Regional District",
        },
        operator: "In",
        values: [regionalDistrict],
      };

  useEffect(() => {
    axios
      .get("/api/token/")
      .then((res) => {
        setToken(res.data.access_token);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((data) => console.log(data.data));
  // }, [token]);

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
          console.log("get report config:", data.data);
          setReportConfig(data.data);
        })
        .catch((err) => console.error("error in getting report config", err));
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

  const [printConfig, setPrintConfig] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const saveAsPDF = () => {
    console.log("currentPage: ", currentPage);
    // axios
    //   .post(
    //     `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/ExportTo`,
    //     {
    //       format: "PDF",
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   )
    //   .then((result) => {
    //     console.log("report result config: ", result);
    //     setPrintConfig(result.data);
    //     setWaiting(true);
    //   })
    //   .catch((err) => console.log("ERROR: ", err));
  };
  const exportId =
    "Mi9CbG9iSWRWMi04ZjQxNGFmYy02ZTY0LTQ0YjctYmYyZi0wZmFjZjY5OWEzNzFOV0NMZEhNUjRUajg4UnRxUDMu";

  // const [percentageComplete, setPercentageComplete] = useState(0);

  // useEffect(() => {
  //   if (percentageComplete < 100) {
  //     const poll = setInterval(() => {
  //       axios
  //         .get(
  //           `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/exports/${exportId}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         )
  //         .then((res) => {
  //           console.log("export result: ", res);
  //           setPercentageComplete(res.data.percentComplete);
  //           // see what the status is....
  //         })
  //         .catch((err) => console.log("error in poll:", err));
  //     }, 10000);

  //     if (percentageComplete === 100) {
  //       return clearInterval(poll);
  //     }
  //   }
  //   return null;
  // }, [token]);

  return embedToken ? (
    <div id="embed-container">
      <button type="button" onClick={saveAsPDF}>
        Save As PDF
      </button>
      {console.log("currentPage", currentPage)}
      <PowerBIEmbed
        embedConfig={{
          type: "report",
          id: reportConfig.id,
          embedUrl: reportConfig.embedUrl,
          accessToken: embedToken,
          tokenType: models.TokenType.Embed,
          pageName: currentPage ? currentPage.name : "",
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
                window.report
                  .getPages()
                  .then((data) => {
                    console.log("pages: ", data);
                    const commReport = data.filter(
                      (report) => report.displayName === "Community Overview"
                    );
                    if (commReport[0].name !== currentPage.name) {
                      // setCurrentPage(commReport[0]);
                      // setCurrentPageData(commReport[0]);
                      window.report
                        .setPage(commReport[0].name)
                        .catch((err) => console.log("setpage error:", err));

                      window.report
                        .setFilters([filter])
                        .catch((err) => console.log("error: ", err));
                      window.report.refresh();
                    }
                  })
                  .catch((err) => console.log("error: ", err));
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
                console.log("pageChanged: ", event.detail);
                setCurrentPage(event.detail.newPage);
              },
            ],
          ])
        }
        // // Add CSS classes to the div element
        cssClassName="report-style-class"
        // set report object
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  ) : null;
}
