<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container elevation-5">
      <div class="pa-8">
        <h1 class="text-h6 mt-1 mb-1">Explore B.C. Communities</h1>
        <ExploreFilterHeader></ExploreFilterHeader>
        <ExploreFilters
          :disabled="loadingResults || $fetchState.pending"
          @filtered="handleFiltered"
          @loading="handleLoading"
        ></ExploreFilters>
      </div>
      <v-divider></v-divider>
      <div>
        <div v-if="$fetchState.pending">
          <ExploreLoader></ExploreLoader>
        </div>
        <div v-else class="pa-8">
          <div>
            <ExploreResultsHeader
              :num-regions="numRegions"
              :num-communities="numCommunities"
              :loading-results="loadingResults"
            ></ExploreResultsHeader>

            <div class="mb-6 d-flex justify-center">
              <div v-if="noCommunities" class="mt-6">
                <ExploreNoResults></ExploreNoResults>
              </div>
            </div>
            <Results :grouped-communities="groupedCommunities"></Results>
          </div>

          <div class="px-10 py-3">
            <v-btn
              :href="`mailto:${$config.citFeedbackEmail}?subject=CIT Feedback`"
              block
              >Give Feedback</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div
      ref="exploreMapContainer"
      class="explore-map-container"
      :class="{
        'explore-map-container-scroll': mapContainerScroll,
      }"
    >
      <ExploreToolbar
        class="elevation-5 explore-toolbar"
        :map-view="showMap"
        @change="handleViewChange"
      ></ExploreToolbar>
      <v-scroll-x-transition>
        <ExploreMap
          v-if="showMap"
          ref="exploreMap"
          class="explore-map"
          :mapbox-api-key="$config.MAPBOX_API_KEY"
          :cids="cidArray"
          :cluster-communities="flatCommunities"
          @moveend="handleMoveEnd"
        ></ExploreMap>

        <ExploreReportSection
          v-else
          :report-cards="reportCards"
          :reports-to-hide="reportsToHide"
          :report-to-show="reportToShow"
          :communities-with-insufficient-data="communitiesWithInsufficientData"
          :cids="cidArray"
          @showReport="showReport"
        ></ExploreReportSection>
      </v-scroll-x-transition>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import without from 'lodash/without'
import intersectionBy from 'lodash/intersectionBy'
import flatMap from 'lodash/flatMap'
import ExplorePages from '~/data/explore/explorePages.json'
import { getRegionalDistricts, getCommunityList } from '~/api/cit-api'
import { getAuthToken } from '~/api/ms-auth-api/'
const exploreStore = namespace('explore')

@Component()
export default class Explore extends Vue {
  groupedCommunities = null
  filteredCommunities = null
  boundedCommunities = null
  selectedReportName = null
  mobileNav = null
  loadingResults = false
  numFiltersActive = 0
  reportCards = ExplorePages
  reportsToHide = null
  communitiesWithInsufficientData = null

  @exploreStore.Getter('getSearchAsMove') searchAsMove

  groupedCommunities = {}
  communityList = []
  regionalDistricts = []

  async fetch() {
    const results = await Promise.all([
      getRegionalDistricts(),
      getCommunityList(),
      getAuthToken(),
    ])
    this.regionalDistricts = results[0].data.results
    this.$store.commit(
      'communities/setRegionalDistricts',
      results[0].data.results
    )
    this.communityList = results[1].data
    this.$store.commit('communities/setCommunities', results[1].data)
    this.groupedCommunities = groupBy(results[1].data, 'regional_district')

    const accessToken = results[2].data.access_token
    this.$store.commit('msauth/setAccessToken', accessToken)
  }

  get noCommunities() {
    return isEmpty(this.groupedCommunities)
  }

  handleLoading(state) {
    this.loadingResults = state
  }

  get mapContainerScroll() {
    return this.activeTab === 'Reports'
  }

  get activeTab() {
    const tab = this.$route.query.tab
    if (!tab) {
      return null
    } else {
      return tab
    }
  }

  get reportToShow() {
    const reportName = this.$route.query.report
    if (!reportName) {
      return null
    }
    return this.reportCards.find((r) => r.name === reportName)
  }

  get showMap() {
    return this.activeTab === 'Map' || this.activeTab === null
  }

  get flatCommunities() {
    return flatMap(this.groupedCommunities)
  }

  get cidArray() {
    return this.flatCommunities.map((c) => c.id.toString())
  }

  get numRegions() {
    return without(Object.keys(this.groupedCommunities), '25', '29', 'null')
      .length
  }

  get numCommunities() {
    let counter = 0
    for (const prop in this.groupedCommunities) {
      counter += this.groupedCommunities[prop].length
    }
    return counter
  }

  layout(context) {
    return 'fixed'
  }

  created() {
    this.$root.$on('reportClose', () => {
      this.closeReport()
    })
  }

  closeReport() {
    const query = Object.assign({}, this.$route.query, { tab: 'Reports' })
    delete query.report
    this.$router.push({
      query,
    })
  }

  mounted() {
    const rid = this.$route.query.rid
    rid && this.$root.$emit('setRegion', rid)
    document.documentElement.classList.add('fixed-layout')
  }

  beforeRouteLeave(to, from, next) {
    document.documentElement.classList.remove('fixed-layout')
    next()
  }

  handleFiltered(e) {
    let filteredCommunities = []
    if (e.empty === true) {
      filteredCommunities = this.communityList
    } else {
      const temp = {}
      e.data.map((cid) => {
        temp[cid] = true
      })
      filteredCommunities = this.communityList.filter(
        (c) => temp[c.id] === true
      )
    }

    this.filteredCommunities = filteredCommunities
    this.updateGroupedCommunities()
    this.reportsToHide = e.reportsToHide
    this.communitiesWithInsufficientData = e.communitiesWithInsufficientData
    this.$root.$emit('communitiesChanged', this.flatCommunities)
  }

  updateGroupedCommunities() {
    this.groupedCommunities = this.getFinalResult(
      this.filteredCommunities,
      this.boundedCommunities
    )
  }

  getFinalResult(fc, bc) {
    if (bc === null) {
      return groupBy(fc, 'regional_district')
    }
    if (fc === null) {
      return groupBy(bc, 'regional_district')
    }
    const intersection = intersectionBy(fc, bc, 'id')
    return groupBy(intersection, 'regional_district')
  }

  handleMoveEnd(e) {
    if (!this.searchAsMove) {
      return
    }

    const sourceFeatures = e.sourceFeatures.map((f) => {
      f.properties.id = parseInt(f.properties.pk)
      return {
        ...f.properties,
        longitude: f.geometry.coordinates[0],
        latitude: f.geometry.coordinates[1],
      }
    })
    this.boundedCommunities = uniqBy(sourceFeatures, 'place_name')
    this.updateGroupedCommunities()
  }

  showReport(reportName) {
    const query = Object.assign({}, this.$route.query)
    const report = {
      report: reportName,
    }
    const temp = Object.assign(query, report)
    this.$router.push({
      query: temp,
    })
    this.$refs.exploreMapContainer.scrollTop = 0
  }

  handleViewChange(data) {
    const query = Object.assign({}, this.$route.query, { tab: data })
    delete query.report
    this.$router.push({
      query,
    })
  }
}
</script>
<style>
.fixed-layout {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
.explore-container {
  position: fixed;
  top: 66px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 46px);
}
.explore-container-mobile {
  padding-top: 56px;
}
.explore-results-container {
  height: calc(100% - 66px);
  flex: 1 1 0;
  flex-shrink: 0;
  min-width: 420px;
  overflow-y: auto;
  position: relative;
  z-index: 100;
}

.explore-map-container {
  flex: 3 1 0;
  height: calc(100% - 66px);
  overflow: hidden;
}

.explore-map-container-mobile {
  height: calc(100% - 10px);
}

.explore-map {
  height: calc(100% - 50px);
}

.explore-toolbar {
  position: relative;
  z-index: 10;
}

.explore-map-container-scroll {
  overflow-y: auto;
}
.explore-results-container::-webkit-scrollbar-track,
.explore-map-container-scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.explore-results-container::-webkit-scrollbar,
.explore-map-container-scroll::-webkit-scrollbar {
  width: 8px;
  height: 5px;
  background-color: #fff;
}

.explore-results-container::-webkit-scrollbar-thumb,
.explore-map-container-scroll::-webkit-scrollbar-thumb {
  background-color: #073366;
  border: 2px solid #555;
  border-radius: 1em;
}

.explore-mobile-toolbar {
  z-index: 5000;
  width: 100%;
  top: 0;
  bottom: initial;
}
</style>
