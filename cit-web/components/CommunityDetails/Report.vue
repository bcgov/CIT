<template>
  <div>
    <div class="desktop-view">
      <div
        ref="reportContainer"
        class="reportContainer"
        :class="extraClassname"
      ></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String })
  pageName

  @Prop({ default: null, type: Number })
  cid

  @Prop({ default: '', type: String })
  extraClassname

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
    const models = this.$pbi.models
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
.reportContainer {
  height: 800px;

  &.demographics {
    height: 1842px;
  }
  &.connectivity {
    height: 960px;
  }
  &.community-assets {
    height: 2298px;
  }
  &.economic-projects {
    height: 1387px;
  }
  &.natural-resource-projects {
    height: 2070px;
  }
}
</style>
