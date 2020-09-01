<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container">
      <div class="pa-8">
        <p class="mb-1">
          Showing
        </p>
        <p class="text-h5 mt-0 font-weight-bold">
          {{ numRegions }} Regional Districts & {{ numCommunities }} Communities
        </p>
        <ExploreFilters @filtered="handleFiltered"></ExploreFilters>

        <div class="mt-5 font-weight-bold d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-file-chart</v-icon>
          See aggregated reports for the following results
          <ReportDialog class="ml-2 d-inline-block"></ReportDialog>
        </div>

        <Results :grouped-communities="groupedCommunities"></Results>
      </div>
    </div>
    <div class="explore-map-container">
      <ExploreMap
        :mapbox-api-key="$config.MAPBOX_API_KEY"
        @moveend="handleMoveEnd"
      ></ExploreMap>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import intersectionBy from 'lodash/intersectionBy'
import ExploreMap from '~/components/Explore/ExploreMap.vue'
import Results from '~/components/Explore/Results.vue'
import ExploreFilters from '~/components/Explore/Filters/ExploreFilters.vue'
import ReportDialog from '~/components/Explore/ReportDialog'
import { getRegionalDistricts, getCommunityList } from '~/api/cit-api'
const exploreStore = namespace('explore')

@Component({
  ExploreMap,
  Results,
  ExploreFilters,
  ReportDialog,
  head() {
    return {
      script: [
        {
          src: 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css',
        },
      ],
    }
  },
})
export default class Explore extends Vue {
  groupedCommunities = null
  filteredCommunities = null
  boundedCommunities = null
  @exploreStore.Getter('getSearchAsMove') searchAsMove

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
    ])
    const regionalDistricts = results[0].data.results
    store.commit('communities/setRegionalDistricts', regionalDistricts)
    const communityList = results[1].data

    const groupedCommunities = groupBy(communityList, 'regional_district')

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
        geometry: f.geometry,
      }
    })
    this.boundedCommunities = uniqBy(sourceFeatures, 'place_name')
    this.groupedCommunities = this.getFinalResult(
      this.filteredCommunities,
      this.boundedCommunities
    )
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
  flex: 2 1 0;
  overflow-y: auto;
}
.explore-map-container {
  flex: 3 1 0;
}
</style>
