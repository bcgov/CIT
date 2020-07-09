<template>
  <div class="home">
    Power Bi Sample
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as pbi from "powerbi-client";
import axios from "axios";

const accessToken =
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDRiYjYzZTktMjE0MS00M2MxLTk1YTctNTU5NWVmMDk3NjFhLyIsImlhdCI6MTU5NDI1MzExMiwibmJmIjoxNTk0MjUzMTEyLCJleHAiOjE1OTQyNTcwMTIsImFpbyI6IkUyQmdZRGpLSUgvblkxMkNVRUhnc3IreVM3ZmNCZ0E9IiwiYXBwaWQiOiI1NWI5MmNmNC1jNzczLTRiMzMtYmU4ZC0xMDFjYmIxZDY3OGUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNGJiNjNlOS0yMTQxLTQzYzEtOTVhNy01NTk1ZWYwOTc2MWEvIiwib2lkIjoiNTI4YWZhMDAtMDA1My00MTJkLTk5MDYtYWRhYjEzYzAwYTM1Iiwic3ViIjoiNTI4YWZhMDAtMDA1My00MTJkLTk5MDYtYWRhYjEzYzAwYTM1IiwidGlkIjoiMDRiYjYzZTktMjE0MS00M2MxLTk1YTctNTU5NWVmMDk3NjFhIiwidXRpIjoidFZCNEM4MmthRU82b2Yxem10c2ZBQSIsInZlciI6IjEuMCJ9.32dtBN3vO4bA3_x7wbfoorT6bEUKNh9QWUNW0s2IWPF_ibhT39eElLKwYyXpHs4ZAaoD4GOhmNLPNtjIMQ7NTrgpceH0Pl_KcM8vP-1uNlduKbUmszjtaovdjZ8NRjx2-3mRKxzUulR1CtEorANKuE5XoXR8QY0YLcKizPjJmSWCgX4zu0nM85gKlHYKs9F4HqFMxwsYTk-8RXoUYsb_LkBhc8zq12gb_VahxBl2HoV_i4fiS7dkhlCW3y9tqYPbuJSim2423f8UABJ7HT1q5VS4Mupjg4_kCRH06WA7ukpEdY0v1cAlVg_qeauQRzMFdkl1B0Ac1nQyZh1QVEZ1FA"
export default {
  name: "Home",
  mounted() {
    const models = pbi.models;
    const embedConfiguration = {
      type: "report",
      id: "a8ef4003-0cc9-4e6f-a1c3-eb1cbeda2e40",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=a8ef4003-0cc9-4e6f-a1c3-eb1cbeda2e40&groupId=99dbfebe-3c0b-4b2d-affb-3af843c67549",
      tokenType: models.TokenType.Embed,
      accessToken: accessToken,
      settings: {
        panes: {
          pageNavigation: {
            visible: false
          }
        }
      }
    };

    const groupId = "99dbfebe-3c0b-4b2d-affb-3af843c67549";
    const reportId = "a8ef4003-0cc9-4e6f-a1c3-eb1cbeda2e40";
    const GenerateInTokenUrl = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`

    axios.get("https://cit-test.countable.ca/api/token/").then(result => {
        const receivedAccessToken = result.data.access_token;

        axios.post(GenerateInTokenUrl, {
          accessLevel: 'view'
        }, {
          headers: {
          'Authorization': `Bearer ${receivedAccessToken}` 
        }}).then((result => {
          const embedToken = result.data.token;

          const embedConfiguration = {
            type: "report",
            id: reportId,
            embedUrl:
              `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
            tokenType: models.TokenType.Embed,
            accessToken: embedToken,
            settings: {
              panes: {
                pageNavigation: {
                  visible: false
                }
              }
            }
          }

          window.powerbi.embed(this.$refs.reportContainer, embedConfiguration);
        }))
    }).catch((e) => {
      console.log("Error Catch", e)
    });



    
    
    /*
    report.on('loaded', function(event) {
      report.getFilters().then(filters => {
          console.log("Filters", filters)
      });
      report.getPages().then(function(pages)
      {
        console.log("pages", pages)
      });
      const page = report.page('ReportSection1afebbb0d697d0b65369');
      page.getFilters()
      .then(filters => {
          console.log("Pgae Filter", filters)
      });
      page.setActive();
    })

    report.on('rendered', function(event) {
      console.log("Report", report)
       report.getFilters().then(filters => {
          console.log("Filters", filters)
      });     
      const page = report.page('ReportSection1afebbb0d697d0b65369');
      page.getFilters()
      .then(filters => {
          console.log("Pgae Filter", filters)
      });
    })
    window.preport = report;
    */
  }
};
</script>
<style>
.reportContainer {
  height: 800px;
}
.reportContainer {
  height: 800px;
}
</style>
