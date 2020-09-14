<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container">
      <div class="pa-8">
        <h1 class="text-h4 mt-1 mb-1">Explore B.C. Communities</h1>
        <div class="mt-4 mb-3 font-weight-bold d-flex align-center">
          <p class="ml-2 text-h6 mb-0">Filters</p>
        </div>
        <ExploreFilters @filtered="handleFiltered"></ExploreFilters>
      </div>
      <v-divider></v-divider>
      <div class="pa-8">
        <div class="mt-4 d-flex align-center font-weight-bold">
          <v-btn small icon><v-icon>mdi-home-group</v-icon></v-btn>
          <p class="ml-2 mb-0">
            Showing
            <b class="text-h5 font-weight-normal">{{ numRegions }}</b> Regional
            Districts &amp;
            <b class="text-h5 font-weight-normal">{{ numCommunities }}</b>
            Communities
          </p>
        </div>

        <div class="mt-3 mb-3 d-flex">
          <ReportDialog
            :cids="cidArray"
            :selected-report-name.sync="selectedReportName"
            :show-report-list.sync="showReportList"
            class="ml-2 d-inline-block"
          ></ReportDialog>
        </div>

        <Results :grouped-communities="groupedCommunities"></Results>
      </div>
    </div>
    <div class="explore-map-container">
      <ExploreMap
        :mapbox-api-key="$config.MAPBOX_API_KEY"
        :cids="cidArray"
        @moveend="handleMoveEnd"
      ></ExploreMap>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import intersectionBy from 'lodash/intersectionBy'
import flatMap from 'lodash/flatMap'
import ExploreMap from '~/components/Explore/ExploreMap.vue'
import Results from '~/components/Explore/Results.vue'
import ExploreFilters from '~/components/Explore/Filters/ExploreFilters.vue'
import ReportDialog from '~/components/Explore/ReportDialog'
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
  ReportDialog,
})
export default class Explore extends Vue {
  groupedCommunities = null
  filteredCommunities = null
  boundedCommunities = null
  selectedReportName = null
  showReportList = false

  @exploreStore.Getter('getSearchAsMove') searchAsMove

  @Watch('$route.query', { immediate: true, deep: true })
  onUrlChange(queryParams) {
    if (queryParams.report) {
      this.showReportList = true
      this.selectedReportName = queryParams.report
    } else if (queryParams.showReportList) {
      this.showReportList = true
      this.selectedReportName = null
    } else {
      this.showReportList = false
      this.selectedReportName = null
    }
  }

  @Watch('selectedReportName')
  onSelectedReportNameChange() {
    if (this.selectedReportName) {
      this.$router.push({ query: { report: this.selectedReportName } })
    } else if (this.showReportList) {
      this.$router.push({ query: { showReportList: this.showReportList } })
    } else {
      this.$router.push({ query: {} })
    }
  }

  @Watch('showReportList')
  onShowReportListChange() {
    if (this.showReportList) {
      this.$router.push({ query: { showReportList: this.showReportList } })
    } else {
      this.$router.push({ query: {} })
    }
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

  async asyncData({ store }) {
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
    }
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
.explore-results-container,
.explore-map-container {
  height: calc(100% - 66px);
}

.explore-results-container {
  flex: 1.5 1 0;
  overflow-y: auto;
}
.explore-map-container {
  flex: 3 1 0;
}
</style>
