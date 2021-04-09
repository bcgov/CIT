import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);
  const [reportConfig, setReportConfig] = useState(null);

  const [embedToken, setEmbedToken] = useState(null);

  const print = () => {
    const element = document.getElementById("container1");
    console.log(element);
    const report = window.powerbi.get(element);
    report.print();
  };

  // const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;
  // const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;

  const groupId = "0399d295-4354-4955-8ed9-68709eb5e7b5";
  const reportId = "1d7ba97a-514e-4fd4-932c-9f4e535c60b8";

  // cit2.0
  // const reportId = "ef9fbbd5-63c7-45e8-b9cf-97fc12319be1";

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
  // Daniel.Hirner@gov.bc.ca
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
          console.log("DATA", data);
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
          console.log("embed token:", data);
          setEmbedToken(data.data.token);
        });
    }
  }, [reportConfig]);

  console.log("reportConfig", reportConfig);

  // const getEmbedConfiguration = () => ({
  //   type: "report",
  //   id: reportId,
  //   // embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
  //   embedUrl: reportConfig.embedUrl,
  //   tokenType: models.TokenType.Embed,
  //   accessToken:
  //     "eyJhbGciOiJIUzI1NiJ9.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUNBTkFEQS1DRU5UUkFMLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ.Q9BJ-7kocvnTadf46ia7rT_ebB8qg9n6ObcLEm29MpM",
  //   settings: {
  //     panes: {
  //       pageNavigation: {
  //         visible: false,
  //       },
  //       filters: {
  //         visible: false,
  //       },
  //     },
  //   },
  // });

  // const embedReport = (container, configuration) =>
  //   window.powerbi.embed(container, configuration);
  // const embedTheReport = () => {
  //   const configuration = getEmbedConfiguration();
  //   const container = document.getElementById("container");
  //   console.log(container);
  //   const report = embedReport(container, configuration);
  // };

  // return (
  //   <>
  //     <button type="button" onClick={print}>
  //       Print
  //     </button>
  //     <div id="container" className="report-style-class" />
  //     {embedToken ? <>{embedTheReport()}</> : null}
  //   </>
  // );

  return embedToken ? (
    <>
      {console.log(embedToken)}
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: reportConfig.id,
          // ...reportConfig,
          embedUrl: reportConfig.embedUrl,
          // embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
          accessToken: embedToken,
          // accessToken:
          //   "H4sIAAAAAAAEAB2Tt66EVgBE_-W1WCIs0ZILck5LpmNJl5yWaPnf_ex-ipmjM3__ONndT1nx8-fP0yxBN95Yo8l9u5Ou3mS-vBuHpJiVr70ShnbOhDvqfMu7h_I8IT_tw2oDZe1fMQVNtjTtUqOaNOlGLKeCVEuQafIy1meeWde0xU91ijH5lHpmDgExydETGXyLvL9kMY1OvnomkcTdgUg4j0CKpolbtnHFuXaJ22zl1mNwXtbhzauHeS0HnHKvgEJaLVudL2sdkNry90fFXw4zSiQXrTM9Pic6gC7u0ivwVnT35TlPmqbzWmdrRZjnONduZMRXjXeY5J-T7n57eQvnDkrQU13YjYh5eeU3gGptXjTpjDf-4sGIJC-FIB93efs90bC5DdtZfDTP-P3kaBU88NUNgY8VfGMSMhpm0mlvPfDK4eOL1NTkYxAIpO9yeG75IT5La-XhwgkCb-prJQEmQi2m_1Vs0sOyeocPeLayrMlJ3xjm79J2A48bDSjechPDLp32JMQfA096IBP1dspFG39bWPLmEs_inbfIegwakxGnl3c5hKsCb25JThJtF0jo0SGckuNNSYmMEPr97gHh14cal5ysdb7Qx7JlUSNQqajg795K7aUFnO6d48tANNdhAS4wYN923n-vL4ngh03XGwsQ5UVHM99ftXNN8Dbaxv3JJg7jbXy-FUMgz4p7GU4nK4XXJGMaPAM9QyzaC9LkPhwUZJRqRR3D0_XA-9iGWXjzUDrH1Dti_vXzxw-_3vN3-p30q-5YINIb9jlp6w_YnoR0H_ghDzIELRG1lQ3nahNgX2Joc2EI0KVxh0pilWZDxFAvIJ80UEYuj0fHQkFH6k5huKlwme228o7d3yumBFDEZcvI6B05Wkj5uRa15rxtSdFeigsrwswYO6cVXtcrKBYAM2GTLhVff6kIvsM5h3aoWMJIS1uvE0XM_AqEPFYsytJ4mNVxPxmJO4Zell-rQoU4wkAUVcMqfDxMZ47D_EDKnnDELNSgBhQqhbMsLPHd0ppJpHnHdCOW-VM1REoxIGbttEcr9d5YPRi7Bm5FWi3oX2gLGwYbrifXHahAg6TAFeizy594BaOKERFHS7aGAqyvKDdx__of8z2DclXDX8p4wdaZVrjjRldiv0_ofBZ2_X_Ka-ox--5r-RtbT_cbsW2LvmmDZY1BjWR7JlXTnvb09xZmMzpOcjlLOQ7ctXzeUIbvQ-U1OPcrNlxgT-MgoSrktTUPQ8GZzPNJ5eNRcIClesDwKlSebUyEVSXx_A65pJHxZG9fnokWgFqGmEi_6y31zF3GvbYhVU6aSkkVSq6doaO-YVG064oB30vYWZefZz0insdgngLsJYX4PkVy-LfSrVQlx8pyC1-H2JRM7hS5rbBnC4I4nJBJzSoc0o9rSmwQA5CgZnLiL5g45gbUkn1U39f6CbNiKBU4WjVOFtrOvM71rOlGYeHdxwI604O3QnwV0OCueBSjTLIljUaHFvizUUYUA3NUPNZjbvyH-Z9_AbxBA5SuBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUNBTkFEQS1DRU5UUkFMLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==",
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
        // getEmbeddedComponent={(embeddedReport) => {
        //   window.report = embeddedReport;
        // }}
      />
    </>
  ) : null;
  // return (
  //   <>
  //     <button type="button" onClick={print}>
  //       Print
  //     </button>
  //     <div id="container1" className="report-style-class">
  //       <iframe
  //         id="container"
  //         width="1140"
  //         height="541.25"
  //         src="https://app.powerbi.com/reportEmbed?reportId=1d7ba97a-514e-4fd4-932c-9f4e535c60b8&autoAuth=true&ctid=6fdb5200-3d0d-4a8a-b036-d3685e359adc&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWNhbmFkYS1jZW50cmFsLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"
  //         frameBorder="0"
  //         allowFullScreen="true"
  //         title="communityInsights"
  //       />
  //     </div>
  //   </>
  // );
}
