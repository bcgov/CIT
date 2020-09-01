<template>
  <div>
    <div class="desktop-view" :class="extraClassname">
      <div ref="reportContainer" class="reportContainer"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: '', type: String }) extraClassname

  embedToken = null
  groupId = '99dbfebe-3c0b-4b2d-affb-3af843c67549'
  reportId = this.$config.reportId
  embedUrl = null
  report = null

  mounted() {
    console.log('Config', this.$config)
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
        this.report.on('loaded', (event) => {
          this.report.getPages().then((pages) => {
            const page = pages.find((p) => p.name === this.pageName)
            const sampleFilter = {
              $schema: 'http://powerbi.com/product/schema#basic',
              target: {
                table: 'communities',
                column: 'id',
              },
              operator: 'In',
              values: [this.cid.toString()],
              filterType: 1, // pbi.models.FilterType.BasicFilter
              requireSingleSelection: false, // Limits selection of values to one.
            }
            page.setFilters([sampleFilter])
          })
        })
      }
    })
  }

  getEmbedConfiguration() {
    const models = window['powerbi-client'].models
    return {
      type: 'report',
      pageName: this.pageName,
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
<style lang="scss">
iframe {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.desktop-view {
  height: 0;
  position: relative;

  &.demographics {
    padding-bottom: 167%; /* 1600px */
  }
  &.connectivity {
    padding-bottom: 100%; /* 960px */
  }
  &.community-assets {
    padding-bottom: 125%; /* 1200px */
  }
  &.economic-projects {
    padding-bottom: 125%; /* 1200px */
  }
  &.natural-resource-projects {
    padding-bottom: 161%; /* 1550px */
  }
}

.reportContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
