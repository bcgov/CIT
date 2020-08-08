<template>
  <div>
    <div>[TODO] Mapbox embed</div>
    <div>[TODO] Demographics | Investing | Assets report buttons</div>
    <div ref="reportContainer" class="reportContainer"></div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

@Component
export default class CommunityQueryContent extends Vue {
  embedToken = null
  groupId = '99dbfebe-3c0b-4b2d-affb-3af843c67549'
  reportId = '2df94147-e5bc-48f2-bdfa-4a78f059e7c9'
  embedUrl = null
  report = null

  // demographics
  pageName = 'ReportSection05fe7b2a55e727a0a41e'
  cid = 11302

  @Prop({ default: undefined, type: Object })
  filters

  @Watch('filters') onFiltersChanged() {
    console.log('filters', this.filters, this.filters.communityType)
  }

  mounted() {
    console.log('CommunityQueryContent mounted')

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
          console.log('report loaded')
          this.report.getPages().then((pages) => {
            console.log('report getPages', pages, this.filters)
            const page = pages.find((p) => p.name === this.pageName)
            const sampleFilter = {
              $schema: 'http://powerbi.com/product/schema#basic',
              target: {
                table: 'communities',
                column: 'community_type',
              },
              operator: 'In',
              values: this.filters.communityType,
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
<style lang="scss" scoped>
.reportContainer {
  height: 100%;
}
</style>
