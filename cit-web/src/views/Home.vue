<template>
  <div class="home">
    Power Bi Sample
    <div ref="reportContainer" class="reportContainer"></div>
    <div ref="reportContainer2" class="reportContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as pbi from "powerbi-client";

const accessToken = 
"H4sIAAAAAAAEAC2Wta7FCpJF_-WlHslMI3VgZmZnpmNmdmv-fa7Une-gtKvWUv37Hzt7hzkr__nff97VJ7VxKrEHfqszinOMUjzGW4VD5SmiXkcKy6xwMbJ-WLq08pumGBw1_oKg4kjWQ-JHAOuPp-9DdilNQQUYQ4Q6slrFKFt5VtC7ivqjTFF3h6RS6cylwlsArMR4Z54bHu332oxAuttp1jxOrNiflA6QG5nAsJUrSVecTPtAYSuI7mVOjSKOgg8eM5xc9tFp9GvYE4YU99ilqhCPFcCA895RmdkcAPMFGEHQd9z5L0aT26dzMqGtHYIea5Vpmgtb8XUVsqtiIoEGNrgnQAhmz275IVMnnfUvm6J4DYP7wSsLhbs9YxNzVk-Vhbm3u3qYXJT4piumbWr7KI4M83P0Z_Kv5T5QiXMxQtNvxL4mXtKUWHbOSwqRXIDlxhbsA5z33mf6roEvLv_hJQqisjiBuYqY7ltZqWdG3TJM3bCTJR4biPcAQ3BsLbXvuLr8PLmY2sQ82GY8DwzPFtZ9DGtxl0VVJu2oysIOsXj7Wnl1TXkEx-UuFWWHACWLvtFWffCOhdbHeF49PYXA_NmYjCFtPZAV2wYzbrDJA7_jM1IDDmoxW5JDd2_zMZtBW_dZF5KNtE1hDxOUS548jCDwhrSofFijGt863V8ev_gOH4SilZCjKyMwYmaaMWH44DxlOIc9Mc7CQCrFJ_QBdld2SbwaCV09SEsXJqUqnFhaQ0osqJUOlJ-nei7hO_WPBji4Lbdo8t676VSvdmXbTMULiBmG43sqFMsAucuOD6p9yD8G_FstQxqbLRy6JgDUx7QNhDpzccns3j45tJ7i49YCzus2y6qBGqeFcO_9E2yRuLIqaxdlPaap7iMbkUFN33AY5tqX53AHXOBVQhA0dAhMgCKkDSUGEiyMHWTdJDFDUtZOLN5uRY-fy5DsI6okpC2_I1pJo1jvdt8ZmbKySc7BOENaP0zrggq3F4_Lo5Woqo87T9Zsyq06JnCDZ3oRivS5hAa0Pe8I_kpg9U2iW79bWQ6lh0Lgv1GX--qT7eFAjp7R-aj00swz2NtZ-3nMtmPNPq86tU4g-sttk0QRJTCI1TR0KZPWNBmXxXuoho-_mJJnWdcO6v0uHb6TtvujhRIYESvdGVs7bXkoh_kSl29_PoaEAOjU5O2B4v6TakQ6sSCwV9M_yqsaP4Tp6xc8ub6cSeg4_PQEGNwhdudq7yA4JDzC66q2D_mh6I2zClMykapEbO9Nfd5I_24a1On6qzFaNm4Uv9-4IE7awH5rGsoObRA3JxQjS0TA0rXtAxyO7jFYjqaJ9EVVnBUYZnJlhx9qdhF9j4aCyD4fx4PJZpghqvG9NwtLL9kle-auxw6ck7jNqk-d_pSjMW7Y5YkG-U6bDwaVzbM7dXUlhHv9dqWtnvF8fQrppf1ALkBWo_75DiA_OnHt9o8rV_ZztBE28pahF-gFrs8zKnWegtwn4JFO1UQ_BAefcU-hrac0CImY7FxF80qQo-P2b2GehQD1NQfI7yYwz3P9UY_Bixox6CL0mStlr19_Ggdks2o2SqEJH5lzdwbRM4mWeXT12I3imty3K41zWq_Ac2VzynnNTeVZW2bDh6vhvuPwiKUlcI3LyQ0WxEFZqgpQBpc3FRP05BzH2ojm-hVyeKKKdv6ocWvhoP51m6aM6TrVAZ0JxSJngFCRHpsMVvvOc3_IoRPwa_d-QVRQFRr-BWGPfUITP6OqF_TN9k_ZHH4Zfyig2YP90lvA8Nsi4Jd0H_iu_F4DgYXTZa1KelCwJRplkn9-V8LR-xq1lcWCzYb7lzOvjYgzKa6uHn7nJvpOL3maRy1grhnVndpteBpk8KlNU09xSkkN9UK0YSrn89eu-Q_bZoUBGh-2USU4o4B82nV0HxdEcu0u8xQGTJ2fCKPtm33xEOd5uiAAW4heunKTvzojqDJMe8wQ4nMCT3KDQPTuae79ZWc7x9VMeuBzb6WZqpQISg0zG4KX2aUm0LV1k2ke7cAXS58gI0Glj4yaTyXJPGAowAMFcJvj7sXNusc1UVxRWW-4XjJEZHEzn5dnieMrsJtWaPE43raUgPWYF21gIejYG57VL1pm2qnxOnInp4k-O8HHf1aNMDbVbM3xuxFE3yejqbVDLfNhC1o2AbseUc32xpxpaZBoaqXVmvWlLvUusREAwoqGHOpEXUPVMSG1J727ToQdq4byqHIign_X2IxooIVurKQub7Aaz9VjIH2Kku4Rqk82ovNCGyvF6W3suGhoRzaSHLQrf_3xknoBgZg_54afxzIQeS2o0YswQLLd1r0APW3CpkmVHOWZf_3rn__5h9ve5Zi16v17cxIiMThz9M3iVN5j4-UPW0R8VuERcQkaRqPdryllRwfkA7AtQT-eQH-Ps9f6WShyckmwGVbj8WfJcdsADzRvcY5jljkxMxvWK3WtmYCmMknPMq2JD6xlDhFoOA2nM0eb9hufQhEcqNBHbaWVED4fVfitd4noDsSDzFqwqxjZ0Z28_Ir5CNy15GmIuJdPDnXKbKOOnR9NeWYIwtsMcl4RpPtE8gE1KWXOcfR8bZxc3VS2pt_d_fc4nLJLGUWu6rSoFBOvfwKgQ4z91YysEMluxX-Sx5ItCpmfZnWbnO9q5BlW7saFk3ayqgW7ulA2-6M3_p00VEvkunm5CVS43Em5x9_6_9b8Lk21KeFfy4zkQk1CtUU2KPoE6ZmqRMN_Ul5bT9lxbtVfrC7szaH9nJj0O4gqQRCAyy2_TP7ZDAYiWpaQ0RI3Lxx1YP6hEsKs9-hAMoxgx9EXtXU5oju9bsnFbIhkcMqljIhSavNBl9urg4qN-OM8VcC-ICRiCo6aP48gKpxVbHduCVBKjuNnz5bb9uBMg3UBpdcaYVd6wCwTvzKBlsd85l8Buh0tiaYZscgF78tkniZgVk1_NT0sNWla0zXQgEZTtVJDyrRlLexN0-99W-PZyZLb8BWA-6Ee7n_eqo1dPsyLyknCGCZS4TqBuvg_96vvSqkI-W36Kp8JYQtsztK-R6FlTMd1siplMvJkF3j3bEVIi4j5tMtGb9ScYRVceK292R_OX83_9__a4m3I2gsAAA=="
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
        panes:{
          pageNavigation: {
            visible: false
          }
        }
      }
    };
    const report = window.powerbi.embed(this.$refs.reportContainer, embedConfiguration);
    const report2 = window.powerbi.embed(this.$refs.reportContainer2, embedConfiguration);

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
