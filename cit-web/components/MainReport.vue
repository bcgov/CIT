<template>
  <div>
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

@Component
export default class MainReport extends Vue {
  embedToken = null
  groupId = '99dbfebe-3c0b-4b2d-affb-3af843c67549'
  reportId = '2df94147-e5bc-48f2-bdfa-4a78f059e7c9'
  embedUrl = null
  report = null

  mounted() {
    GetReportInGroup(this.groupId, this.reportId)
      .then((response) => {
        const { status, data } = response
        if (status === 200) {
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
  }

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
            visible: false,
          },
          filters: {
            visible: false,
          },
        },
      },
    }
  }

  embedReport(container, configuration) {
    return window.powerbi.embed(container, configuration)
  }
}
</script>
<style lang="scss" scoped>
.reportContainer {
  position: fixed;
  bottom: 0;
  top: 66px;
  left: 0;
  right: 0;
}
</style>
