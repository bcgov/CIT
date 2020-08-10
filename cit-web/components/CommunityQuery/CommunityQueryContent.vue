<template>
  <div>
    <div>
      <button type="button" @click="navigate('map')">Map</button>
      <button type="button" @click="navigate('demographics')">
        Demographics
      </button>
      <button type="button" @click="navigate('investors')">Investing</button>
      <button type="button" @click="navigate('assets')">Assets</button>
    </div>
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

  cid = 11302

  reportMap = {
    demographics: 'ReportSection8d04d6af6c305669df44',
    investors: 'ReportSection668fd80adbb838852446',
    assets: 'ReportSection864e9b323cb5914f8a55',
  }

  currentReport = 'demographics'

  filterMap = {
    communityType: {
      table: 'communities',
      column: 'community_type',
    },
    estimatedPopulation: {
      table: 'censussubdivisions',
      column: 'population',
    },
    populationGrowth: {
      table: 'censussubdivisions',
      column: 'population_percentage_change_bin',
    },
    has50Mbps: {
      table: 'communities',
      column: 'Broadband Access',
    },
    hasClinics: {
      table: 'communities',
      column: 'Has Clinic',
    },
    hasHospitals: {
      table: 'communities',
      column: 'Has Hospital',
    },
    hasK12: {
      table: 'communities',
      column: 'Has K-12',
    },
    hasPostSecondary: {
      table: 'communities',
      column: 'Has Post Secondary',
    },
    hasMills: {
      table: 'communities',
      column: 'Has Mill',
    },
    wildfireZone: {
      table: 'communities',
      column: 'WildfireZoneSlicer',
    },
    tsunamiZone: {
      table: 'communities',
      column: 'TsunamiZoneSlicer',
    },
  }

  @Prop({ default: undefined, type: Object })
  filters

  @Watch('filters') onFiltersChanged() {
    console.log('filters changed', this.filters, this.filters.communityType)
    this.updateReportFilters()
  }

  mounted() {
    console.log('CommunityQueryContent mounted')
    this.getReport()
  }

  navigate(target) {
    console.log('navigate', target)
    this.currentReport = target
    this.getReport()
  }

  getReport() {
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
          this.updateReportFilters()
        })
      }
    })
  }

  getEmbedConfiguration() {
    const models = this.$pbi.models
    return {
      type: 'report',
      pageName: this.reportMap[this.currentReport],
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

  updateReportFilters() {
    if (!this.filters) {
      return
    }

    this.report.getPages().then((pages) => {
      console.log('currentReport', this.reportMap[this.currentReport])
      const page = pages.find(
        (p) => p.name === this.reportMap[this.currentReport]
      )
      const powerBiFilters = Object.keys(this.filters).reduce((acc, filter) => {
        const filterValue = this.filters[filter]
        const filterIsNonNull =
          (!Array.isArray(filterValue) && filterValue !== undefined) ||
          (Array.isArray(filterValue) && filterValue.length > 0)
        if (filterIsNonNull) {
          acc.push({
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
              table: this.filterMap[filter].table,
              column: this.filterMap[filter].column,
            },
            operator: 'In',
            values: Array.isArray(filterValue) ? filterValue : [filterValue],
            filterType: 1, // pbi.models.FilterType.BasicFilter
            requireSingleSelection: false, // Limits selection of values to one.
          })
        }
        return acc
      }, [])
      if (powerBiFilters.length > 0) {
        // todo: add loading spinner
        page.setFilters(powerBiFilters).then((data) => {
          // todo: remove loading spinner
        })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.reportContainer {
  height: 100%;
}

/* temporary styling */
button {
  background-color: #073366;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-right: 0.5rem;
}
</style>
