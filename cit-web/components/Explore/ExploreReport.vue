<template>
  <div>
    <!-- To Trigger Lifecycle method on prop update -->
    <div v-show="false">{{ pageName }} {{ cids }}</div>
    <div
      ref="reportContainer"
      class="reportContainer"
      :style="`height: 70vw;`"
      style="margin: 0 auto;"
    ></div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'

@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: '', type: String }) height
  @Prop({ default: '', type: String }) width

  @Watch('cids')
  onCidsChanged() {
    this.whenReportLoaded((report) => {
      this.setFilter()
    })
  }

  embedToken = null

  groupId = '99dbfebe-3c0b-4b2d-affb-3af843c67549'
  reportId = this.$config.reportId
  embedUrl = null
  report = null
  loaded = false

  async mounted() {
    const { data: reportInGroup } = await GetReportInGroup(
      this.groupId,
      this.reportId
    )
    this.embedUrl = reportInGroup.embedUrl

    const { data: tokenInGroup } = await GenerateTokenInGroup(
      this.groupId,
      this.reportId
    )
    this.embedToken = tokenInGroup.token
    const configuration = this.getEmbedConfiguration()
    const container = this.$refs.reportContainer
    this.report = this.embedReport(container, configuration)
    this.listenToEvents()
  }

  beforeUpdate(e) {
    this.whenReportLoaded((report) => {
      const page = report.page(this.pageName)
      page.setActive()
      this.setFilter()
    })
  }

  whenReportLoaded(fn) {
    if (this.loaded) {
      fn(this.report)
    } else {
      this.$on('loaded', (report) => {
        fn(report)
      })
    }
  }

  listenToEvents() {
    this.report.on('loaded', (event) => {
      this.loaded = true
      this.$emit('loaded', this.report)
      this.setFilter()
    })

    this.report.on('rendered', () => {
      this.$emit('rendered')
    })
  }

  setFilter() {
    this.report.getPages().then((pages) => {
      const page = pages.find((p) => p.name === this.pageName)
      page.setFilters([this.getFilter(this.cids)])
    })
  }

  getFilter(cids) {
    return {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: 'communities',
        column: 'id',
      },
      operator: 'In',
      values: cids,
      filterType: 1, // pbi.models.FilterType.BasicFilter
      requireSingleSelection: false, // Limits selection of values to one.
    }
  }

  getEmbedConfiguration() {
    const models = window['powerbi-client'].models
    console.log(models)
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
