<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container">
      <div class="pa-8">
        <p class="mt-10 mb-1">
          Showing results for
        </p>
        <p class="text-h5 mt-0 font-weight-bold">
          13 Regional Districts & 59 Communities
        </p>
        <ExploreFilter class="mb-2 mr-2" title="Community Type"></ExploreFilter>
        <ExploreFilter class="mb-2 mr-2" title="Population"></ExploreFilter>
        <ExploreFilter class="mb-2 mr-2" title="Schools"></ExploreFilter>
        <ExploreFilter class="mb-2 mr-2" title="More Filters"></ExploreFilter>

        <p class="mt-5 font-weight-bold d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-file-chart</v-icon>
          See aggregated reports for the following results
          <v-btn class="ml-2" small color="info" depressed>View Reports</v-btn>
        </p>

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
import { Component, Vue } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import ExploreMap from '~/components/Explore/ExploreMap.vue'
import Results from '~/components/Explore/Results.vue'
import ExploreFilter from '~/components/Explore/ExploreFilter.vue'
import { getRegionalDistricts, getCommunityList } from '~/api/cit-api'

@Component({
  ExploreMap,
  Results,
  ExploreFilter,
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
      regionalDistricts,
      groupedCommunities,
    }
  }

  handleMoveEnd(e) {
    const sourceFeatures = e.sourceFeatures.map((f) => {
      return {
        ...f.properties,
        geometry: f.geometry,
      }
    })
    this.groupedCommunities = groupBy(
      uniqBy(sourceFeatures, 'place_name'),
      'regional_district'
    )
  }
}
</script>
<style lang="scss" scoped>
.explore-container {
  position: absolute;
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
