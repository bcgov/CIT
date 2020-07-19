<template>
  <div>
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

export default {
  props: {
    accessToken: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      embedToken: null,
      groupId: '99dbfebe-3c0b-4b2d-affb-3af843c67549',
      reportId: 'a8ef4003-0cc9-4e6f-a1c3-eb1cbeda2e40',
      embedUrl: null,
      report: null,
    }
  },
  mounted() {
    GetReportInGroup(this.groupId, this.reportId)
      .then((response) => {
        const { status, data } = response
        if (status === 200) {
          console.log(data)
          this.embedUrl = data.embedUrl
        } else {
          throw new Error(response)
        }
      })
      .catch((e) => {
        console.error(e)
      })
    GenerateTokenInGroup(this.groupId, this.reportId).then((response) => {
      const { status, data } = response
      if (status === 200) {
        this.embedToken = data.token
        const configuration = this.getEmbedConfiguration()
        const container = this.$refs.reportContainer
        this.report = this.embedReport(container, configuration)
      }
    })
  },
  methods: {
    getEmbedConfiguration() {
      const models = this.$pbi.models
      return {
        type: 'report',
        id: this.reportId,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${this.reportId}&groupId=${this.groupId}`,
        tokenType: models.TokenType.Embed,
        accessToken: this.embedToken,
        settings: {
          panes: {
            pageNavigation: {
              visible: true,
            },
          },
        },
      }
    },
    embedReport(container, configuration) {
      return window.powerbi.embed(container, configuration)
    },
  },
}
</script>
<style lang="scss" scoped>
.reportContainer {
  height: 800px;
}
</style>
