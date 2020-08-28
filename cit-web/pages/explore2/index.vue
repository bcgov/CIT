<template>
  <div class="explore-container d-flex">
    <div class="explore-results-container">
      <div class="pa-8">
        <ExploreFilter title="Community Type"></ExploreFilter>
        <ExploreFilter title="Population"></ExploreFilter>
        <ExploreFilter title="Schools"></ExploreFilter>
        <ExploreFilter title="Clinics"></ExploreFilter>
        <ExploreFilter title="Hospitals"></ExploreFilter>
        <ExploreFilter title="More Filters"></ExploreFilter>

        <p class="text-h5 mt-4 mb-4">
          Showing 13 Regional Districts & 59 Communities
        </p>
        <p>
          See aggregated reports for the following communities
          <v-btn class="ml-2">View Reports</v-btn>
        </p>

        <Results :regional-districts="regionalDistricts"></Results>
      </div>
    </div>
    <div class="explore-map-container">
      <ExploreMap :mapbox-api-key="$config.MAPBOX_API_KEY"></ExploreMap>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import ExploreMap from '~/components/Explore/ExploreMap.vue'
import Results from '~/components/Explore/Results.vue'
import ExploreFilter from '~/components/Explore/ExploreFilter.vue'

import { getRegionalDistricts } from '~/api/cit-api'

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
  layout(context) {
    return 'fixed'
  }

  async asyncData() {
    const results = await Promise.all([getRegionalDistricts()])
    const regionalDistricts = results[0].data.results
    return {
      regionalDistricts,
    }
  }
}
</script>
<style lang="scss" scoped>
.explore-container {
  position: absolute;
  top: 66px;
  left: 0;
  bottom: 0;
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
