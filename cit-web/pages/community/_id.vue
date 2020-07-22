<template>
  <div>
    <MainHeader
      :title="communityName"
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
              <v-list-item
                v-for="(df, key) in communityDisplayFields"
                :key="key"
              >
                <v-list-item-content>{{
                  df.metadata.name
                }}</v-list-item-content>
                <v-list-item-content class="align-end">{{
                  df.value | yesno
                }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col col="6">
          <div id="map" ref="map"></div>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <CensusSubdivision
        :classification="communityDetails.municipality_classification"
        :census-subdivision="censusSubdivision"
      ></CensusSubdivision>
    </v-container>

    {{ displayFields }}
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
// import { omitBy } from 'lodash'
import MainHeader from '~/components/MainHeader.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import { getCommunity, getCensusSubDivision } from '~/api/cit-api'
import { yesno } from '~/utils/filters'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component({
  MainHeader,
  CensusSubdivision,
  filters: {
    yesno,
  },
})
export default class CommunityDetail extends Vue {
  communityDetails = {}
  censusSubdivision = {}
  placeName = ''

  get communityDisplayFields() {
    let dfs = this.communityDetails.display_fields
    if (!dfs) {
      return []
    }
    const excludes = {
      census_subdivision_id: true,
    }
    dfs = dfs.filter((df) => !excludes[df.key])
    return dfs
  }

  get communityName() {
    return 'Fort Nelson'
  }

  async asyncData({ $config: { MAPBOX_API_KEY }, params }) {
    try {
      const cid = params?.id
      let response = await getCommunity(cid)
      const { data: communityDetails } = response

      const csid = communityDetails.display_fields.find(
        (df) => df.key === 'census_subdivision_id'
      )
      response = await getCensusSubDivision(csid?.value)
      const { data: censusSubdivision } = response

      return {
        MAPBOX_API_KEY,
        communityDetails,
        censusSubdivision,
      }
    } catch (e) {
      console.error(e)
      return {
        MAPBOX_API_KEY,
      }
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
  height: 450px;
}

.community-list {
  width: 800px;
  margin: 0 auto;
}
</style>
