<template>
  <div>
    <div v-if="error || accessTokenError">
      <v-alert type="warning">
        {{ errorMessage }}
      </v-alert>
    </div>
    <div
      v-else
      ref="reportContainer"
      class="reportContainer"
      :style="`height: ${height}px; width: ${width}px;`"
      style="margin: 0 auto;"
    ></div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch, namespace } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'
const msauthModule = namespace('msauth')

@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: '', type: String }) height
  @Prop({ default: '', type: String }) width

  @msauthModule.Getter('getIsError') accessTokenError

  @Watch('cids')
  onCidsChanged() {
    this.whenReportLoaded((report) => {
      this.setFilter()
    })
  }

  @Watch('pageName')
  async pageNameChanged() {
    await this.init()
  }

  errorMessage = null
  error = false
  embedToken = null
  groupId = '0399d295-4354-4955-8ed9-68709eb5e7b5'
  reportId = this.$config.reportId
  embedUrl = null
  report = null
  loaded = false
  error = false

  async mounted() {
    try {
      await this.init()
    } catch (e) {
      console.error(e)
      this.error = true
      this.errorMessage = 'There was an error loading the reports.'
    }
  }

  async init() {
    if (this.accessTokenError === true) {
      this.errorMessage = 'There was an error retrieving an access token.'
      return
    }
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
    if (this.error === false) {
      this.listenToEvents()
    }
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
      console.log(page)
      console.log(page.defaultSize.width)
      console.log(page.defaultSize.height)
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
    if (container && configuration) {
      return (
        window &&
        window.powerbi &&
        window.powerbi.embed(container, configuration)
      )
    } else {
      this.error = true
    }
  }
}
</script>
<style lang="scss">
iframe {
  border: none !important;
}
.reportContainer {
  height: calc(90vw);
}
</style>
