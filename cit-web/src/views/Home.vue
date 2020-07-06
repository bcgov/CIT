<template>
  <div class="home">
    Power Bi Sample
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as pbi from "powerbi-client";

const accessToken = 
"H4sIAAAAAAAEAB1VxQ7siBH8l3f1SmZaaQ9mZhjbN9tjZoYo_57Z3LtbpYKu__yx06ef0u-fv_-I0lF0VPdVKIbeo5Veh9m_NnG2WnqtqgQwyGl676pZQwRf4CLY7nJ38bYuyjC-1g0m9DGRnrd1DvrIjWCUV0XYub0Y0II87V5sqWdqmAjzYGzGqM-LC-MOa5g1nefmjVXONybgws_ri-KQtHADuSJS2RYqAqVvkySF3oA840elJX4RBKVhDCAYKxVwIueg7W1atCiKPMCAUbsO1GlAsoalYKs9Arv4oi4e9wj1ZSgbJF_aOOcewHxcEgQkEBTD0mTV6T2FBh-EeMPz0b2DvaznVo1JvIYwnN_L9sGiJcD8WeHlcy03a-oq_q4oI3PbZei-PAGYWcVCSSF-tqs-4hQ77xfAS0a4T44hThmNFl5BxbNWcm2CJ9ixTddM7ip64JeROBoBeFKaD7MYvVfRFsCIW9gpIL8E1_HRluQjALFIBrIhGKb2NHnco8yayD1EAfumo0Sar1LgJ84US7iUYGMI3nUBRz404lt9norT5pBI2gTci6Ox98XR3q4ky6NHSXaa5O8XK782NJWG1FxT3XaP3aLwOmoQzJmRPlfsecE7P8KVU6Zf6ojlplWAT_QGniOiXEmP_FrSwm1kPEbOdINJLqY2UX2ujYydFbnwSTi0c1jHlldGITIRy3RhzaC0ZRtKdiQBrk4sFQ12IBKD2HvPjnT1wqZKDYjKIWkMlaG4cKy7qhFdaSd9zkQL1rTMHnXgpe48Hc8qnXdP7_2Qz4953ew4fS6Z6jvPsa44WldF3CWusCnLSNo8GFAwnFfOhlr0Eaa5hyMVa-9w2580jFaPqZwEJz4urlnZZQ0DMz3cgpTIZRGig2sce6hJ83nRO8MQGcnUFBqTbuLS10Ip4igmGY_hg_gZgACoGVnwy05xVh_MyfQDpU0mCbmw60sVVCQVvHDU6Eu7HtzlIOJx16Ia-0cecZtilQNq3bpd3CB1vuVojxkUWMeCqKYYc_duogsL8Zdeu6duEKJSK7iIbfTMJFiEi0NgZc0Tne4IlYPqNUvk48bcQrxZ57jFfyMzV1sg0OED22euyQVey7occq6NOsc4hXTg2WCapoO5OybClg9PZx0J6mFgarL30yqV_1KOU_rmtR1o9QFZWEoniRWheeaLovUE1us-zgsdbIOqC8G9F6cXkeVd8KxcW9qvmKy5tJhFvdFmWNiNJhx-pt_h_YwFDNDPhUHFqGBRTWxc5cNEz6TaJf3dFpiQj-qTzjHs583iuGdC6oypefdesDNjfCmjx8sZF8zp8xYnj5nIkcwSjfUT8gJhYQ0rd9-R5zfd3HmjsO3Ip-JGdJQ68n1vfEOBJFc83m7sGKh9HhSXHl4cds98qlxpQQXeCp_9Qx8hqxUGlZfJGq36Sh4vMHZuZAgTubkx3-cMqlukQfczBdwlnHFU15xfzeR3hW7YoeEcJfWpmSaWANTFomd72sWYSV2FGG-0aPjlBz6XbvZtGKRjjUfKe2jqxa_rnxa6Jn7JJG_6k07qSAv1SRtx8Uu15epfJEfJUC4RcXf5C-tvEy3oIv8EKm4JnQh6kqhWWr9DfLtBGV9u7ptBddqRQurC9Hibrmlutyzs5KrLVhvBIhJ_PqnOClxnWHpTgijLHN-1uDKni2xVTUB5wsdo0ogomhgFe1XoxRdl1OoYJ8SW_Xpgn80N2m18MoLIyeZkGjvTdSsvEkRoosHqMD9Kor8oQEmwddcuwfmKfEHMbzORd3P2csTqbc7_QZZh2Zwn72XtdRBSREhKivavq5NXutzzuqsBBjv7MT_J8Py0vvM-EdYyCN090Pj9Ra-tT1KZnI9kRc8OsBX_ha-sg2eD5aIBiQO32owqLjnzdUTiKz8ax2znxH-cNB5N-iW6B0eFnLHfAtEqY22BaiTbV3nIC7naW03Nhn0_WBfk9H5EzTwY1kiemhj3A8NL2Dxmzae4m02B7jUj-DfJr7mwwRVSwJHIA4WvHAmzSa6uAyD-yMNwYLHAi_INpDOJL8L16wGeFks_XN8Uav789Ydbn3mftOL51XnyNNoDrZR37RdWzUUZ39LPMXcPbwoAZlI4dIy_K_kMqjPmaR69ue3gRnCy-QM9U7P5IN7d3-DNCrTW31WcVAQpx9ucVztpSwS9a7Gpw73ShzGxLpfnm8r9A3u29s8OzBiO7RbPv4_Z8_bnZrwwr-EoCwlNAogQ9qT0w3j8TZgCXGiAbB2YVD3at9hx5-ETH420A-0euNHfDluNgMSKBA10DebDYJ5_jpQrPAT1dxtWtsnLEy_jQyaIF9c8GBghDXBEfkFLvU2jcqK_jTHU6xrSfmi8TPZqjlzbwhxImY2FnhUoirfsmZAncxNCfPnEsNQcZkhbK8rBFyGrsi6p3pTu1T___EvzM9fFqoQ_ln3Jzcjew-nMelR8Z6NsrVjm_1NeU43pfqzFb6y4bj0RgMiz4aRcY12Vx65rd5jJb4Fv3sr6oBLGqq5lIdxCzTXwCM_btZ_OiBfUHw-hr9uifShF4Ei_iPlbd_fxa6V6hEwVI4nfuDN-QR0rom-I8HYPgMdHLeHQwmq9XjaVhS_ImBIvPwesix1j2XtIccXLTyG1qXJvZ6z52jSyrJW3noyJmv79FazbrM96feEcLa7iSloXmjwBjWLCKXWKoYh58IdshbDSqeNwvHKYcEmQCfSMWK1x_yaLRUVgC67KZK6JdOIysp0vtDsf7kjSXHApIL6U7oAGh0BNdP5ew4UCMyvvQN3QKV0e6wBq9WJHDk8PntBQoBEsU9bDp2Fi0b9i_Pd_F0NCM8IKAAA="
export default {
  name: "Home",
  mounted() {

    const models = pbi.models;
    const embedConfiguration = {
      type: "report",
      id: "a4816556-4db7-4ad6-912a-5fc7543eba71",
      embedUrl:
        "https://app.powerbi.com/reportEmbed?reportId=a4816556-4db7-4ad6-912a-5fc7543eba71&groupId=2a9d0676-389b-415a-b3ce-71a13108e610",
      tokenType: models.TokenType.Embed,
      accessToken: accessToken
    };
    const report = window.powerbi.embed(this.$refs.reportContainer, embedConfiguration);

    report.on('loaded', function(event) {
      report.getFilters().then(filters => {
          console.log("Filters", filters)
      });
      	report.getPages().then(function(pages)
        {
          console.log("pages", pages)
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
</style>
