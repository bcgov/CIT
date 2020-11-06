<template>
  <div>
    <!-- To Trigger Lifecycle method on prop update -->
    <div v-show="false">{{ pageName }} {{ cids }}</div>
    <div v-if="isAccessTokenValid">
      <div
        ref="reportContainer"
        class="reportContainer"
        style="margin: 0 auto;"
      ></div>

      <div class="d-flex justify-end report-options">
        <FeedbackButton class="my-1 mx-1"></FeedbackButton>
        <ShareButton class="my-1 mx-1"></ShareButton>
        <div class="my-1 mx-1">
          <v-btn color="primary" :loading="printLoading" @click="print"
            >Print</v-btn
          >
        </div>
        <CloseReportButton class="my-1 mx-1"></CloseReportButton>
      </div>
    </div>
    <div v-else-if="error || accessTokenError">
      <v-alert type="warning">
        {{ errorMessage }}
      </v-alert>
    </div>
    <div v-else>
      <v-alert type="Info">
        Access Token Loading
      </v-alert>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch, namespace } from 'nuxt-property-decorator'
import { GenerateTokenInGroup } from '~/api/powerbi-rest-api/EmbedToken.js'
import { GetReportInGroup } from '~/api/powerbi-rest-api/Report.js'
import { getAuthToken } from '~/api/ms-auth-api/'
const msauthModule = namespace('msauth')

@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: '', type: String }) height
  @Prop({ default: '', type: String }) width

  @msauthModule.Getter('getIsError') accessTokenError
  @msauthModule.Getter('getAccessToken') accessToken

  @Watch('accessToken')
  async handleAccessToken(nv, ov) {
    if (nv !== null && nv !== false) {
      await this.init()
    }
  }

  @Watch('cids')
  onCidsChanged() {
    this.whenReportLoaded((report) => {
      this.setFilter()
    })
  }

  embedToken = null
  error = false
  errorMessage = null
  groupId = '0399d295-4354-4955-8ed9-68709eb5e7b5'
  reportId = this.$config.reportId
  embedUrl = null
  report = null
  loaded = false
  printLoading = false
  isAccessTokenValid() {
    return this.accessToken !== null && this.accessToken !== false
  }

  async fetch() {
    const result = await getAuthToken()
    const accessToken = result.data.access_token
    this.$store.commit('msauth/setAccessToken', accessToken)
  }

  async mounted() {
    if (this.accessToken === null || this.accessToken === false) {
      this.$emit('loaded')
      return
    }

    if (this.accessTokenError === true) {
      this.errorMessage = 'There was an error retrieving an access token'
      this.$emit('loaded')
      return
    }

    try {
      if (this.isAccessTokenValid) {
        await this.init()
      }
    } catch (e) {
      console.error(e)
      this.$emit('loaded')
      this.error = true
      this.errorMessage = 'There was an error loading the reports.'
    }
  }

  init() {
    this.nextTick(async () => {
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
    })
  }

  beforeUpdate(e) {
    this.whenReportLoaded((report) => {
      const page = report.page(this.pageName)
      page.setActive()
      this.setFilter()
    })
  }

  print() {
    this.whenReportLoaded((report) => {
      report.print().finally(() => {
        this.printLoading = false
      })
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
<style lang="scss">
.reportContainer {
  height: 70vw;
}

@media screen and (max-width: 900px) {
  .reportContainer {
    height: 90vw;
  }
}

@media screen and (max-width: 500px) {
  .report-options {
    flex-direction: column;
  }
}
</style>
