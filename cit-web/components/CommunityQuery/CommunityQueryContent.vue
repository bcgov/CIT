<template>
  <div>
    <!-- <div ref="communityCount" class="communityCount"></div> -->
    <div class="mb-5">
      <v-btn color="primary" @click="navigate('map')">Map</v-btn>
      <v-btn color="primary" @click="navigate('demographics')">
        Demographics
      </v-btn>
      <v-btn color="primary" @click="navigate('investors')">Investing</v-btn>
      <v-btn color="primary" @click="navigate('assets')">Assets</v-btn>
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
  reportId = this.$config.reportId
  embedUrl = null
  report = null
  communityCountReport = null

  cid = 11302

  pageNameMap = {
    demographics: 'ReportSection8d04d6af6c305669df44',
    investors: 'ReportSection668fd80adbb838852446',
    assets: 'ReportSection864e9b323cb5914f8a55',
    homepage: 'ReportSection0eea901e3d74bb16d21c',
    communityCount: 'ReportSectionac96eedf9d065e66718d',
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
    this.updateReportFilters()
  }

  mounted() {
    this.getReport()
  }

  navigate(target) {
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
        this.report = this.embedMainReport()
        this.report.on('loaded', (event) => {
          console.log('report loaded')
          this.report.on('dataSelected', (dataSelectedEvent) => {
            console.log('dataSelected', dataSelectedEvent)
          })
          this.updateReportFilters()
        })
        // this.communityCountReport = this.embedCommunityCount()
        // this.communityCountReport.on('loaded', (event) => {
        //   console.log('report loaded')
        //   this.updateReportFilters()
        // })
      }
    })
  }

  embedMainReport() {
    const pageName = this.pageNameMap[this.currentReport]
    const configuration = this.getReportEmbedConfiguration(pageName)
    const container = this.$refs.reportContainer
    return this.embedReport(container, configuration)
  }

  // embedCommunityCount() {
  //   const pageName = this.pageNameMap.communityCount
  //   const container = this.$refs.communityCount
  //   const configuration = this.getReportEmbedConfiguration(pageName)
  //   return this.embedReport(container, configuration)
  // }

  getReportEmbedConfiguration(pageName) {
    const models = window['powerbi-client'].models
    return {
      type: 'report',
      pageName,
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

  serializePowerBiFilters() {
    return Object.keys(this.filters).reduce((acc, filter) => {
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
  }

  updateReportFilters() {
    if (!this.filters) {
      return
    }

    const powerBiFilters = this.serializePowerBiFilters()

    this.report.getPages().then((pages) => {
      console.log('currentReport', this.pageNameMap[this.currentReport])
      const activePage = pages.find(
        (p) => p.name === this.pageNameMap[this.currentReport]
      )
      if (powerBiFilters.length > 0) {
        // todo: add loading spinner
        activePage.setFilters(powerBiFilters).then((data) => {
          // todo: remove loading spinner
        })
        console.log('activePage', activePage)
      }
    })

    // this.communityCountReport.getPages().then((pages) => {
    //   const communityCountPage = pages.find(
    //     (p) => p.name === this.pageNameMap.communityCount
    //   )
    //   console.log('communityCountPage', communityCountPage)
    //   communityCountPage.setFilters(powerBiFilters).then((data) => {
    //     console.log('communities count updated')
    //   })
    //   if (powerBiFilters.length > 0) {
    //     // todo: add loading spinner
    //     communityCountPage.setFilters(powerBiFilters).then((data) => {
    //       // todo: remove loading spinner
    //     })
    //     console.log('communityCountPage', communityCountPage)
    //   }
    // })
  }
}
</script>
<style lang="scss">
.reportContainer {
  height: 100%;
  border: none !important;
}

iframe {
  border: none !important;
}
</style>
