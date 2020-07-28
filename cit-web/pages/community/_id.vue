<template>
  <div>
    <div v-if="isCommunityEmpty" class="d-flex mt-5 justify-center">
      <v-alert type="info">
        Sorry, we could not find a communtiy with that ID.
      </v-alert>
    </div>
    <div v-else>
      <MainHeader
        :title="placeName"
        subtitle="Community Details"
        class="mb-5"
      />

      <v-container>
        <v-row>
          <v-col col="4">
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
          <v-col col="8">
            <div id="map" ref="map"></div>
          </v-col>
        </v-row>

        <v-row>
          <v-col col="12">
            <v-expansion-panels v-model="panels" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Demographics</v-expansion-panel-header
                >
                <v-expansion-panel-content eager>
                  <Report
                    page-name="ReportSection3f0e4e05d2cefefb8f2c"
                    :cid="communityDetails.id"
                  ></Report>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Connectivity</v-expansion-panel-header
                >
                <v-expansion-panel-content eager>
                  <Report
                    page-name="ReportSectionafe2f332b411e5127156"
                    :cid="communityDetails.id"
                  ></Report>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Projects</v-expansion-panel-header>
                <v-expansion-panel-content eager>
                  <Report
                    page-name="ReportSection1486ad00d6b6d6e826a3"
                    :cid="communityDetails.id"
                  ></Report>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>

        <v-row>
          <v-col col="12">
            <CensusSubdivision
              :classification="communityDetails.municipality_classification"
              :census-subdivision="censusSubdivision"
            ></CensusSubdivision>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { isEmpty } from 'lodash'
import MainHeader from '~/components/MainHeader.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import { getCommunity, getCensusSubDivision } from '~/api/cit-api'
import { yesno } from '~/utils/filters'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component({
  MainHeader,
  CensusSubdivision,
  Report,
  filters: {
    yesno,
  },
})
export default class CommunityDetail extends Vue {
  communityDetails = {}
  censusSubdivision = {}
  panels = [0]

  // Methods

  get isCommunityEmpty() {
    return isEmpty(this.communityDetails)
  }

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

  get placeName() {
    const dfs = this.communityDetails.display_fields
    if (!dfs) {
      return ''
    }
    const placeName = dfs.find((df) => df.key === 'place_name')
    return placeName?.value
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
    if (this.isCommunityEmpty) {
      return
    }
    const options = this.getMapboxOptions()
    const map = new mapboxgl.Map(options)
    this.addNavigationControl(map)
    this.setCenter(
      map,
      this.communityDetails.longitude,
      this.communityDetails.latitude
    )
    new mapboxgl.Marker()
      .setLngLat([
        this.communityDetails.longitude,
        this.communityDetails.latitude,
      ])
      .addTo(map)

    map.on('click', function (e) {
      console.log(e)
      const features = map.queryRenderedFeatures(e.point)
      const location = features.find(
        (f) => f.sourceLayer === 'locations-2bvop8'
      )
      if (location) {
        console.log(location)
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(location.properties.name)
          .addTo(map)
      }
    })
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
