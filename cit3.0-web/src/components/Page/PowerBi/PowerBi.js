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
    setToken(
      "H4sIAAAAAAAEAB2XxQ70SAKD3-W_ZqUw9EpzCDNj5xZm5oz23bdn7paq9Fm2q_7-YyVPPyX5n__-oZVicjVTKcA6VNIP0qhfePYjgWBxMsjSVGP5ZA8OyeHeWgIt323zezawLUnjoRXA0UraxxpBo2VSDJmKN5n2NV8sQbAJfi6wulMvFTmrbEZdwMoOjwXa5uZtxAYKqlxYPfxyCnLI70FlanLinmBQ-oeZihR_LbGpXry3dnm2tHjgom9OPFvuAyWEbGLhYWMeb2mpcT5G7d8SekfIeEyEVxMJwfzaxx91oPJdmGsnq1p6Cc2u8MEg38JqPnBqZGK2-aqLTWiuNVlggkzqkfdbN6VJtQOMd33gl03dMe1ELfWjTlDgLH0w6nZZZELljEqPqdvOvk7KsLkpA21Se7bOJMKcQCOJ0sgcInTUC3vGcjum8JNqOmfjfJmGJQlMkCigAz0V6l3JdieoNtt-boOjfY9QBwso8dQeyKzDgR5nn5GgoeVKdiP2choHFgN0bYlvt4YHuFpIRbj3aIHzUwz3HAcx8vUzwMULMSoylwSvdkYMKxdPoSHQTtLwkagTfvW9BXoZ9d34GlZsi_xzKNuHOStKA-_Cvj73CZTYMaPzo2uTYAmh-LPx2kF66UAzIJj6cfoWChLs-AT5XDFC0PGJytkhR4trymF9jjMBLgyeA2Rgu3o0OMnWPj1k7fP7HDNv213JTIwxWHVKWiHQbcSfd8Y8L2vevskTTN9UFJm4xei6aI900K2IphXeaIbuIHFHeWO_nqWyXW1TMVOowvAoJzpoIkiQ_KisNweCN3gRsUqlBYcse5FIte2tuqqhjVSKIUpIy3kIP4EjrC3iXWqiCtpQVTdSwEEromnGh121UwLald9R3E5Xhb5amAb8PuG2YMvm2lctqUTmijjS_OoV-JFyjd8BE6GBtrZJzqS6PNheNaWlD2h2EOB954F-I72TR2McQ7eugOo8gDzljYU05dHL5kO2TEtepNmR9InNz0n6bC4k9Px3Px590psoLLeER5cs-e4YHdL4u2C-TM9x32oYw2SiVL5n2o-BM1kN_nwdmJ_zAHZ3S02DNKBc7R7ky6Ai0zt2L_WL77v3XJPep4rURHxuo6w5r4OqsI9KXt5zCD8FfRSLWrCsZdU7DRJOzFHhOTVw5dM1gayMTSg1RxaQNK01j7DDRixsVetjYu4LbsQ6euF0K80Jxav09VM8T2RFRqtHaW7WtN3tspLwR6NQwXLYcsAMR1l5EHIShz0pHyVr6RIPiK6Bs3XBtiAPPBQKdVNCUaKEVybXMqU74ZDW0Isbo3NCfU32sgNggJgGpLEQW7-iT0U4LlSuLK07yUkXyWLvNLwYKdnxPtPYX5_nG_kEVRlAGNip0e5yA2BSGsDF-RG__IZUN27cTSm3SJDmPyeGEQLt2mjmroNN5Ctr0rjPq8jEITFMo135_lzepzKUxHSnPfzBe9FT0cOG_GyQINowjVrQ4LZKZWwUorqqf0FpF-UyLGmUMLAmFhLPOw3ZXCIlezBF6CnyslWVMh7KJXMHHGK_STkbCkQyXKbhXs8WT8dTdXWEIUPqoGMQRN_AYy7PdzQ-X7fC3CdE22G4btB4i5kR_HQR1rylEA5x5FH6inJ9hYaYK83V2kGzvuiFcSsM7lv2Pk14WBOZwpAMJcgwu84uBN7toaVnrt8uziyALRqTYgbdwakmjGrpQ4wF9yj0VWnBSJjGD8CNLIqF_iIK4OxUrzrMOavQYc004Pu3vRP1tKXJxda86Yhk77_6-jVBCq9HtmP8KbceqX_LN_FNssgNs8Xp7jgEudUBn8SkTKzEiumcHlkGg9u_HY4MhHcrn_kYx3bcVhwMxs_78LzPJKkZfAAkeBPWB9D-7V1tFbFaUtvsNKxCohGfz4R3gWp2o2mIOZHs2W6n8YEXuydycwMEMd0dzCUiNQku-CCGwDpb1PMnnTmhvBfSzwSVGJLIre1QGRz88aE5F77FqkGUWm3xo1LYzlaFgKJn0ghdkDVuO9viLlx7VNVjYqI2CmmSDd69XbgbQ33R_TZXYqk4TEg_DbhkwiXPDNZY4yRlNIbOYDbuIRwyam1w0mqsp4FFKuPLv60itDtS1nFEd65iFtajoqeioA5bhQWkgaFKItoxp_V0ZfkC-6zNqynrdSHUYAyWe0cimZGOCbuQueISoeZR9VlDa_Jh7kJfA7YtCWeaa9EjRBKW58yw5cNmQ-qLR5FCJo8V2GBxV04MjLFleYHHNncaVjRrNa9pfQML8u_99duIOftXz5ZOhNRd4olf1a7mMGi9EEqvpzdudQG_MoSVfCwkr2CYAHI09Rk_qdmMiN-YXm73WSA92c4bQLoYHyLyeeNYWpdvOtLX5oiS9W0Ui7Ggijx_KD5VUHSH-15skki9C-Ih7_D1U2-5cyckT3NiJ42_W3et_fSKHaYi__znD7s-8z6pxfN7TomwugBFmxVTnET50pKgT86d_NHAndkQk_4tlvlCfucLziw2LrmWtV2UHftmeSNCwCOpCRMo1TmHZi-lxSxAqFG6tGeHGx03YdxS-iCNkWC3iX1VbaOR3AimFBeTUivTIUbhuNF758KUxvS4frB_VejcZLi6ZbYmXSltvajFEXa9wnSdq0cUTY2Azd27JvU32heWJpNKdiY1KVLTTtiif1VMtORkopJZGtN3yit0KkruyJbfFQSEua9gb8wJ_VyYQn_eAof1xuQy26NWpgubyASKuFEtA50E6EHc28CAzTD1gm5-84DXTFYKR1G3LkK0Rvb0FcZ9-4wWa1pTUimf9Fl86L_--gfzM9fFKgc_ypocvihmA3dFtQfDjfc8asT1r8ptqjHZj7X4ydK7vjpAxsx5VbrtadB4iKxSqFM-ys8GH5Pmd8hBBv6e_upL1Mkj17gNUCd_iuQa-tSSk84Az3r4QsXwGEnfAbGTYYwprnJC5HhYE5s8PeEySTHBLgTMHE5kqXPDLK2YUdwdWgIgp-szPPbWw7GiopV_8XlPyF3oCGmjcSfQNzy4nja4UGzpTgwEYH4pPTP4fjCrSKNeKK24vgHg0aOaAlKFCoNiUK5EmsKSGRGMTuPM9_Y7DEMX7XBlmml2InHQAJa-PzyZbGTMynGRa5hHKpYSG87Ux-RUxAHOb2PhcKEW67W-LTbRTtrY5gnqkff7Dmjfcnm924wMvgwsnXptgE_76of5f_8HedIoakIMAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19"
    );
    // axios
    //   .get("/api/token")
    //   .then((res) => {
    //     setToken(res.data.access_token);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  return token ? (
    <PowerBIEmbed
      embedConfig={{
        type: "report", // Supported types: report, dashboard, tile, visual and qna
        // id: reportId,
        id: "f6bfd646-b718-44dc-a378-b73e6b528204",
        // embedUrl: `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d`,
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
