<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container elevation-5">
      <div class="pa-8">
        <h1 class="text-h6 mt-1 mb-1">Explore B.C. Communities</h1>
        <div class="mt-4 mb-3 font-weight-bold d-flex align-center">
          <p class="text-body-1 mb-0">Filters</p>
        </div>
        <ExploreFilters @filtered="handleFiltered"></ExploreFilters>
      </div>
      <v-divider></v-divider>
      <div class="pa-8">
        <div class="mt-4 d-flex align-center font-weight-bold">
          <p class="ml-2 mb-0">
            Showing
            <b class="text-h5 font-weight-normal">{{ numRegions }}</b> Regional
            Districts &amp;
            <b class="text-h5 font-weight-normal">{{ numCommunities }}</b>
            Communities
          </p>
        </div>

        <div class="mt-3 mb-3 d-flex">
          <v-btn
            small
            depressed
            color="primary"
            class="text-capitalize"
            @click="handleTabChange('Reports')"
          >
            <v-icon small class="mr-2">mdi-file-chart</v-icon>
            View Reports
          </v-btn>
          <v-btn
            small
            depressed
            color="primary"
            class="ml-2 text-capitalize"
            :href="`mailto:${citFeedbackEmail}?subject=CIT Feedback`"
          >
            <v-icon small class="mr-2">mdi-comment</v-icon>
            Give Feedback
          </v-btn>
        </div>

        <Results :grouped-communities="groupedCommunities"></Results>
      </div>
    </div>
    <div
      class="explore-map-container"
      :class="{ 'explore-map-container-scroll': mapContainerScroll }"
    >
      <ExploreToolbar
        class="elevation-5 explore-toolbar"
        :active-tab="activeTab"
        :breadcrumbs="breadcrumbs"
        @tabChange="handleTabChange"
      ></ExploreToolbar>
      <v-scroll-x-transition>
        <ExploreMap
          v-show="showMap"
          ref="exploreMap"
          :mapbox-api-key="$config.MAPBOX_API_KEY"
          :cids="cidArray"
          @moveend="handleMoveEnd"
        ></ExploreMap>
      </v-scroll-x-transition>
      <v-scroll-x-transition>
        <div v-show="!showMap">
          <ExploreReportSection
            :report-cards="reportCards"
            :report-to-show="reportToShow"
            :cids="cidArray"
            @showReport="showReport"
          ></ExploreReportSection>
        </div>
      </v-scroll-x-transition>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
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

  reportCards = ExplorePages

  @exploreStore.Getter('getSearchAsMove') searchAsMove

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
          path: `/explore`,
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

  get mapContainerScroll() {
    return this.activeTab === 'Reports'
  }

  get flatReportCards() {
    return flatMap(this.reportCards)
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
    return this.flatReportCards.find((r) => r.name === reportName)
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

  async asyncData({ store, $config }) {
    const results = await Promise.all([
      getRegionalDistricts(),
      getCommunityList(),
      getAuthToken(),
      getCommunityGeoJSON(),
    ])
    const regionalDistricts = results[0].data.results
    store.commit('communities/setRegionalDistricts', regionalDistricts)
    const communityList = results[1].data
    store.commit('communities/setCommunities', communityList)
    const accessToken = results[2].data.access_token
    store.commit('msauth/setAccessToken', accessToken)
    const groupedCommunities = groupBy(communityList, 'regional_district')
    const communityGeoJSON = results[3].data
    store.commit('communities/setCommunityGeoJSON', communityGeoJSON)

    return {
      communityList,
      regionalDistricts,
      groupedCommunities,
      citFeedbackEmail: $config.citFeedbackEmail,
    }
  }

  handleTabChange(tab) {
    this.$router.push({
      query: {
        tab,
      },
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
  }

  updateGroupedCommunities() {
    this.groupedCommunities = this.getFinalResult(
      this.filteredCommunities,
      this.boundedCommunities
    )
    this.$root.$emit('communitiesChanged', this.flatCommunities)
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
}
.explore-results-container {
  height: calc(100% - 66px);
  flex: 1.5 1 0;
  overflow-y: auto;
}

.explore-map-container {
  flex: 3 1 0;
  height: calc(100% - 116px);
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
</style>
