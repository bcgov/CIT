import { useState, useEffect } from "react";
import axios from "axios";
import "./PowerBi.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBi(props) {
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState(null);

  // const reportId = process.env.REACT_APP_POWER_BI_REPORT_ID;
  // const groupId = process.env.REACT_APP_POWER_BI_GROUP_ID;

  const groupId = "0399d295-4354-4955-8ed9-68709eb5e7b5";
  const reportId = "ef9fbbd5-63c7-45e8-b9cf-97fc12319be1";

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
        // id: "f6bfd646-b718-44dc-a378-b73e6b528204",
        embedUrl: `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
        // embedUrl: `https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d`,
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
  ) : (
    <iframe
      width="1140"
      height="541.25"
      src="https://app.powerbi.com/reportEmbed?reportId=3a848d28-934f-4e08-be41-b4acd90f616a&autoAuth=true&ctid=337a945d-ac66-4f8c-b739-e23a06080308&config=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNmZkYjUyMDAtM2QwZC00YThhLWIwMzYtZDM2ODVlMzU5YWRjLyIsImlhdCI6MTYxNzIxMjE1OSwibmJmIjoxNjE3MjEyMTU5LCJleHAiOjE2MTcyMTYwNTksImFpbyI6IkUyWmdZR0NWTHBnU1pSRnVxNVhyNUs2aHMrY2RBQT09IiwiYXBwaWQiOiJmNjQ1MGUxZC1hODViLTQ2YjctODE4MC1jNzJmOWVjYWQ2NTMiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZmRiNTIwMC0zZDBkLTRhOGEtYjAzNi1kMzY4NWUzNTlhZGMvIiwib2lkIjoiZDJlZWUyMTktYjgzYy00NTZhLWJkNzktNzI1M2JhOTEyZjdmIiwicmgiOiIwLkFUZ0FBRkxiYncwOWlrcXdOdE5vWGpXYTNCME9SZlpicUxkR2dZREhMNTdLMWxNNEFBQS4iLCJzdWIiOiJkMmVlZTIxOS1iODNjLTQ1NmEtYmQ3OS03MjUzYmE5MTJmN2YiLCJ0aWQiOiI2ZmRiNTIwMC0zZDBkLTRhOGEtYjAzNi1kMzY4NWUzNTlhZGMiLCJ1dGkiOiJlbkJ1cHd3S0FVeXNFWXEzcUVJY0FBIiwidmVyIjoiMS4wIn0.YdZrHcwnTlkV3cJG3Z3PdF74YJRSHc8vJy1mvVK-_Jx15CDa2g4aSP7eB3hyhO7vBC0-kyv4lxlhXFaQ5OeabtqHrh5_LXDVTnakY-19X8CWNyGWRsW8uEKH28BHcE_HQt9NIkMXEZxJdf2SLw0maznzyRO7uGty0w8XxTGzsp2pQNwc-WVGdb0QVcLitoluifn5621PhORcEDlY39oaXKUSVyloAIQlW-pmsYMWQ_eNrUKam75bYmn3DB_frDygxC-3a-01I3H1pWBN2aKUD8HAOvnuAABDsf9e0QGfD1I0UcAh7PlF3hSu_eGPNqYEaoJ2sfmcSZeIcgUy7vxjKg%3D"
      frameBorder="0"
      allowFullScreen="true"
      title="communityInsights"
    />
  );
}
