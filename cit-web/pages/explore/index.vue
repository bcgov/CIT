<template>
  <div>
    <div v-if="!isMobile" class="explore-container d-flex">
      <div class="explore-results-container elevation-5">
        <div class="pa-8">
          <h1 class="text-h6 mt-1 mb-1">Explore B.C. Communities</h1>
          <ExploreFilterHeader></ExploreFilterHeader>
          <v-alert v-if="filterError" type="error" dense outlined dismissible>
            There was an error
          </v-alert>
          <ExploreFilters
            :disabled="loadingResults || $fetchState.pending"
            @filtered="handleFiltered"
            @loading="handleLoading"
            @error="handleFilterError"
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
          <div v-if="showMap" class="explore-map">
            <ExploreMap
              ref="exploreMap"
              :mapbox-api-key="$config.MAPBOX_API_KEY"
              :cids="cidArray"
              :cluster-communities="flatCommunities"
              @moveend="handleMoveEnd"
            ></ExploreMap>
          </div>

          <ExploreReportSection
            v-else
            :report-cards="reportCards"
            :reports-to-hide="reportsToHide"
            :report-to-show="reportToShow"
            :communities-with-insufficient-data="
              communitiesWithInsufficientData
            "
            :cids="cidArray"
            @showReport="showReport"
          ></ExploreReportSection>
        </v-scroll-x-transition>
      </div>
    </div>
    <div v-else>
      <div class="mobile-map-container">
        <ExploreMap
          ref="exploreMap"
          :mapbox-api-key="$config.MAPBOX_API_KEY"
          :cids="cidArray"
          :cluster-communities="flatCommunities"
          @moveend="handleMoveEnd"
        ></ExploreMap>
      </div>
      <div class="bottom-menu-container elevation-5">
        <v-bottom-navigation horizontal height="50">
          <v-btn
            value="data"
            @click="
              $router.push({
                query: {
                  tab: 'Data',
                },
              })
            "
          >
            <span>Data Wizard</span>

            <v-icon>mdi-auto-fix</v-icon>
          </v-btn>

          <v-btn
            value="Reports"
            @click="
              $router.push({
                query: {
                  tab: 'Reports',
                },
              })
            "
          >
            <span>Reports</span>

            <v-icon>mdi-file-document</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
      <v-bottom-sheet
        :value="sheetOpen"
        persistent
        scrollable
        style="position: relative;"
      >
        <v-card>
          <div class="mobile-collapse">
            <v-btn color="primary" fab x-small @click="handleMobileCollapse">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
          <v-card-text class="pa-0" style="height: 80vh;">
            <div v-if="activeTab === 'Data'">
              <div class="pa-8">
                <h1 class="text-h6 mt-1 mb-1">Explore B.C. Communities</h1>
                <ExploreFilterHeader></ExploreFilterHeader>
                <v-alert
                  v-if="filterError"
                  type="error"
                  dense
                  outlined
                  dismissible
                >
                  There was an error
                </v-alert>
                <ExploreFilters
                  :disabled="loadingResults || $fetchState.pending"
                  @filtered="handleFiltered"
                  @loading="handleLoading"
                  @error="handleFilterError"
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
                    <Results
                      :grouped-communities="groupedCommunities"
                    ></Results>
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
            <div v-else-if="activeTab === 'Reports'">
              <ExploreReportSection
                :report-cards="reportCards"
                :reports-to-hide="reportsToHide"
                :report-to-show="reportToShow"
                :communities-with-insufficient-data="
                  communitiesWithInsufficientData
                "
                :cids="cidArray"
                @showReport="showReport"
              ></ExploreReportSection>
            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
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
import {
  getRegionalDistricts,
  getCommunityList,
  setPageView,
} from '~/api/cit-api'
import { getAuthToken } from '~/api/ms-auth-api/'
import { getPageViewOptions } from '~/utils'
const exploreStore = namespace('explore')

@Component()
export default class Explore extends Vue {
  filterError = false
  groupedCommunities = null
  filteredCommunities = null
  boundedCommunities = null
  selectedReportName = null
  loadingResults = false
  numFiltersActive = 0
  reportCards = ExplorePages
  reportsToHide = null
  communitiesWithInsufficientData = null
  isHydrated = false

  mobileNav = null

  get sheetOpen() {
    return (
      this.$route.query.tab === 'Reports' || this.$route.query.tab === 'Data'
    )
  }

  handleMobileCollapse() {
    this.$router.push({
      query: {},
    })
  }

  @exploreStore.Getter('getSearchAsMove') searchAsMove

  groupedCommunities = {}
  communityList = []
  regionalDistricts = []

  handleFilterError(data) {
    this.filterError = data
  }

  get isMobile() {
    if (this.isHydrated) {
      return this.$vuetify.breakpoint.width < 900
    } else {
      return false
    }
  }

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
    this.isHydrated = true
    if (!this.isMobile) {
      this.$root.$emit('openLayerSwitcher')
    }
    const rid = this.$route.query.rid
    rid && this.$root.$emit('setRegion', rid)
    document.documentElement.classList.add('fixed-layout')

    const opts = getPageViewOptions()
    if (opts) {
      setPageView(opts)
        .then((result) => {})
        .catch((e) => {
          console.error(e)
        })
    }
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
    if (!this.isMobile) {
      this.$refs.exploreMapContainer.scrollTop = 0
    }
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
  bottom: 46px;
  right: 0;
  width: 100%;
}
.explore-container-mobile {
  padding-top: 56px;
}
.explore-results-container {
  height: 100%;
  flex: 1 1 0;
  flex-shrink: 0;
  min-width: 420px;
  overflow-y: auto;
  position: relative;
  z-index: 100;
}

.explore-map-container {
  flex: 3 1 0;
  height: 100%;
  overflow: hidden;
}

.explore-map-container-mobile {
  height: calc(100% - 10px);
}

.explore-map {
  height: calc(100% - 64px);
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

.mobile-map-container {
  position: fixed;
  top: 66px;
  bottom: 96px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 4;
}

.bottom-menu-container {
  position: fixed;
  bottom: 46px;
  left: 0;
  right: 0;
}

.mobile-collapse {
  position: absolute;
  top: -40px;
  text-align: center;
  left: 0;
  right: 0;
}

@media screen and (max-width: 540px) {
  .mobile-map-container {
    bottom: 112px;
  }

  .bottom-menu-container {
    position: fixed;
    bottom: 62px;
    left: 0;
    right: 0;
  }
}
</style>
