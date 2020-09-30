<template>
  <div
    class="explore-container d-flex"
    :class="{ 'explore-container-mobile': isMobile }"
  >
    <client-only>
      <div v-if="isMobile">
        <v-bottom-navigation
          v-model="mobileNav"
          absolute
          class="explore-mobile-toolbar"
        >
          <v-btn value="Data" @click="handleTabChange('Data')">
            <span>Data View</span>
            <v-icon>mdi-text-box-outline</v-icon>
          </v-btn>

          <v-btn value="Map" @click="handleTabChange('Map')">
            <span>Map View</span>
            <v-icon>mdi-map</v-icon>
          </v-btn>

          <v-btn value="Reports" @click="handleTabChange('Reports')">
            <span>Reports</span>
            <v-icon>mdi-file-chart</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
    </client-only>
    <div
      v-show="!isMobile || (isMobile && activeTab === 'Data')"
      class="explore-results-container elevation-5"
    >
      <div class="pa-8">
        <h1 class="text-h6 mt-1 mb-1">Explore B.C. Communities</h1>
        <div class="mt-4 mb-3 font-weight-bold d-flex align-center">
          <p class="text-body-1 mb-0 d-flex align-center">
            First, choose selection criteria from this data menu to generate a
            list of matching regional districts and communities:
            <v-tooltip bottom color="primary" class="rounded-lg">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="primary">mdi-information</v-icon></v-btn
                >
              </template>
              <span class="text-body-1"
                >The data menu below will filter based on
                <span class="font-weight-bold"
                  >all communities in British Columbia</span
                ></span
              >
            </v-tooltip>
          </p>
        </div>
        <ExploreFilters
          :disabled="loadingResults"
          @filtered="handleFiltered"
          @loading="handleLoading"
        ></ExploreFilters>
      </div>
      <v-divider></v-divider>
      <div class="pa-8">
        <h5 class="text-h6 mb-5">Selection Results</h5>

        <div v-if="loadingResults" class="d-flex justify-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            class="my-5"
          ></v-progress-circular>
        </div>
        <div v-else>
          <div class="mt-0 d-flex align-center">
            <p class="mb-0 text-body-1">
              Showing
              <span class="font-weight-bold">{{ numRegions }}</span> Regional
              Districts &amp;
              <span class="font-weight-bold">{{
                numCommunities && numCommunities.toLocaleString()
              }}</span>
              Communities
            </p>
          </div>

          <div class="mt-3 mb-6 d-flex justify-center">
            <v-btn
              v-if="!noCommunities"
              block
              depressed
              color="primary"
              class="text-capitalize"
              @click="handleTabChange('Reports')"
            >
              View Reports for
              {{ numCommunities && numCommunities.toLocaleString() }}
              communities
              <v-spacer></v-spacer>
              <v-icon block class="mr-2">mdi-arrow-right</v-icon>
            </v-btn>
            <div v-else class="mt-6">
              <p
                class="text-h4 light-blue--text text--darken-1 text-center font-weight-bold"
              >
                No Communities
              </p>
              <p class="text-body-1">
                Try broadening your filters/search criteria
              </p>
            </div>
          </div>
          <Results :grouped-communities="groupedCommunities"></Results>
        </div>
      </div>
    </div>
    <div
      v-show="!isMobile || (isMobile && activeTab !== 'Data')"
      ref="exploreMapContainer"
      class="explore-map-container"
      :class="{
        'explore-map-container-scroll': mapContainerScroll,
        'explore-map-container-mobile': isMobile,
      }"
    >
      <client-only>
        <ExploreToolbar
          v-if="!isMobile"
          class="elevation-5 explore-toolbar"
          :active-tab="activeTab"
          :breadcrumbs="breadcrumbs"
          @tabChange="handleTabChange"
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
            :cids="cidArray"
            @showReport="showReport"
          ></ExploreReportSection>
        </v-scroll-x-transition>
      </client-only>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import intersectionBy from 'lodash/intersectionBy'
import flatMap from 'lodash/flatMap'
import ExploreMap from '~/components/Explore/ExploreMap.vue'
import Results from '~/components/Explore/Results.vue'
import ExploreFilters from '~/components/Explore/Filters/ExploreFilters.vue'
import ExploreToolbar from '~/components/Explore/ExploreToolbar.vue'
import ExploreReportSection from '~/components/Explore/ExploreReportSection'
import ExplorePages from '~/data/explore/explorePages.json'

import {
  getRegionalDistricts,
  getCommunityList,
  getCommunityGeoJSON,
} from '~/api/cit-api'
import { getAuthToken } from '~/api/ms-auth-api/'
const exploreStore = namespace('explore')

@Component({
  ExploreMap,
  Results,
  ExploreFilters,
  ExploreToolbar,
  ExploreReportSection,
})
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

  @exploreStore.Getter('getSearchAsMove') searchAsMove

  get isMobile() {
    return this.$vuetify.breakpoint.width < 1050
  }

  get noCommunities() {
    return isEmpty(this.groupedCommunities)
  }

  get breadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Home',
        disabled: false,
        to: {
          path: `/`,
        },
      },
      {
        exact: true,
        text: 'Explore',
        disabled: false,
        to: {
          path: `/explore?tab=Map`,
        },
      },
      {
        exact: true,
        text: this.activeTab,
        disabled: false,
        to: {
          path: `/explore?tab=${this.activeTab}`,
        },
      },
    ]

    const reportName = this.$route.query.report
    if (reportName) {
      breadcrumbs.push({
        text: reportName,
        disabled: true,
      })
    }

    return breadcrumbs
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
    return this.activeTab === 'Map'
  }

  get flatCommunities() {
    return flatMap(this.groupedCommunities)
  }

  get cidArray() {
    return this.flatCommunities.map((c) => c.id.toString())
  }

  get numRegions() {
    return Object.keys(this.groupedCommunities).length
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

  mounted() {
    const rid = this.$route.query.rid
    rid && this.$root.$emit('setRegion', rid)
  }

  async fetch({ store }) {
    try {
      const results = await Promise.all([getAuthToken()])
      const accessToken = results[0].data.access_token
      store.commit('msauth/setAccessToken', accessToken)
    } catch (e) {
      console.error(e)
      store.commit('msauth/setIsError', true)
    }
  }

  async asyncData({ store, $config }) {
    try {
      const results = await Promise.all([
        getRegionalDistricts(),
        getCommunityList(),
        getCommunityGeoJSON(),
      ])
      const regionalDistricts = results[0].data.results
      store.commit('communities/setRegionalDistricts', regionalDistricts)
      const communityList = results[1].data
      store.commit('communities/setCommunities', communityList)
      const groupedCommunities = groupBy(communityList, 'regional_district')
      const communityGeoJSON = results[2].data
      store.commit('communities/setCommunityGeoJSON', communityGeoJSON)

      return {
        communityList,
        regionalDistricts,
        groupedCommunities,
      }
    } catch (e) {
      console.error(e)
      return {
        communityList: [],
        regionalDistricts: [],
        groupedCommunities: [],
      }
    }
  }

  handleTabChange(tab) {
    const query = Object.assign({}, this.$route.query)
    query.tab = tab
    this.$router.push({
      query,
    })
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
    this.reportsToHide = e.reports
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
    // raise an event whenever the selection changes (this is a side-effect)
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
}
</script>
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
  height: auto;
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
