<template>
  <div>
    <MainHeader
      :title="communityDetails.place_name"
      subtitle="Community Details"
      class="mb-5"
    />

    <v-container>
      <v-row>
        <v-col col="6">
          <v-card>
            <v-card-title class="subheading font-weight-bold"
              >Community Details</v-card-title
            >

            <v-divider></v-divider>
            <v-list dense>
              <v-list-item v-for="(value, key) in communityDetails" :key="key">
                <v-list-item-content>{{ key }}</v-list-item-content>
                <v-list-item-content class="align-end">{{
                  value
                }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col col="6">
          <div id="map" ref="map"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col col="6">
          <CensusSubdivision
            :classification="communityDetails.municipality_classification"
            :census-subdivision="censusSubdivision"
          ></CensusSubdivision>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MainHeader from '~/components/MainHeader.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import { getCommunity, getCensusSubDivision } from '~/api/cit-api'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component({
  MainHeader,
  CensusSubdivision,
})
export default class MyComponent extends Vue {
  communityDetails = {}
  censusSubdivision = []
  placeName = ''

  get groupedCensus() {
    const groupedCensus = {}
    /*
    for (const key in groupedCensus) {

    } */
    return groupedCensus
  }

  async asyncData({ $config: { MAPBOX_API_KEY }, params }) {
    const cid = params?.id
    let response = await getCommunity(cid)
    const { data: communityDetails } = response

    const csid = communityDetails.census_subdivision
    response = await getCensusSubDivision(csid)
    const { data: censusSubdivision } = response

    return {
      MAPBOX_API_KEY,
      communityDetails,
      censusSubdivision,
    }
  }

  addNavigationControl(map) {
    map.addControl(new mapboxgl.NavigationControl())
  }

  setCenter(map, lng, lat) {
    map.setCenter([lng, lat])
  }

  getMapboxOptions() {
    return {
      container: 'map',
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0',
      center: [-122.970072, 49.299062],
      zoom: 12,
    }
  }

  created() {
    mapboxgl.accessToken = this.MAPBOX_API_KEY
  }

  mounted() {
    const options = this.getMapboxOptions()
    const map = new mapboxgl.Map(options)
    this.addNavigationControl(map)
    this.setCenter(
      map,
      this.communityDetails.longitude,
      this.communityDetails.latitude
    )
  }
}
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 761px;
}

.community-list {
  width: 800px;
  margin: 0 auto;
}
</style>
