<template>
  <div>
    <div v-if="isCommunityEmpty" class="d-flex mt-5 justify-center">
      <v-alert type="info">
        Sorry, we could not find a community with that ID.
      </v-alert>
    </div>
    <div v-else>
      <div class="community-details-sidebar elevation-5">
        <div class="pa-5">
          <v-card>
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
        </div>

        <v-chip
          v-for="(locationGroup, key) in groupedLocations"
          :key="key"
          class="ma-2"
          color="deep-purple accent-4"
          outlined
        >
          <v-icon left>mdi-school</v-icon>
          {{ locationGroup.length }} {{ key | startCase }}
        </v-chip>
        <div v-for="(locationGroup, key) in groupedLocations" :key="key">
          <div
            v-for="location in locationGroup"
            :key="location.id"
            class="pa-2"
          >
            <v-card class="mx-auto pa-3" outlined dense>
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-school</v-icon>
                <div class="ma-0 pa-0">{{ location.name }}</div>
              </div>
              <div class="overline pa-0 ma-0">
                {{ location.public_or_independent }}
              </div>
            </v-card>
          </div>
        </div>
      </div>
      <div class="comm-details-content">
        <v-container>
          <v-row no-gutters>
            <v-col :cols="12">
              <div style="position: relative;">
                <div id="map" ref="map"></div>
                <v-card class="legend">
                  <v-list>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Internet Speeds</v-list-item-title>
                        <v-list-item-subtitle
                          >50/10
                          <div
                            class="legend-icon"
                            style="background-color: #8572d3;"
                          ></div
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          >25/5
                          <div
                            class="legend-icon"
                            style="background-color: #ec67ad;"
                          ></div
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          >10/2
                          <div
                            class="legend-icon"
                            style="background-color: #ff826f;"
                          ></div
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle
                          >5/1
                          <div
                            class="legend-icon"
                            style="background-color: #f7ba44;"
                          ></div
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <Report
          page-name="ReportSection05fe7b2a55e727a0a41e"
          :cid="communityDetails.id"
          extra-classname="demographics"
        ></Report>
        <Report
          page-name="ReportSectionbc899e8fac8c2b494765"
          :cid="communityDetails.id"
          extra-classname="connectivity"
        ></Report>
        <Report
          page-name="ReportSectionc87b6c3907e9321ae830"
          :cid="communityDetails.id"
          extra-classname="community-assets"
        ></Report>
        <Report
          page-name="ReportSectionf2b8f5bb464e6d79a9ed"
          :cid="communityDetails.id"
          extra-classname="economic-projects"
        ></Report>
        <Report
          page-name="ReportSection8f523b520a86970e96d4"
          :cid="communityDetails.id"
          extra-classname="natural-resource-projects"
        ></Report>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { isEmpty, groupBy, startCase } from 'lodash'
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
    startCase,
  },
  head() {
    return {
      title: this.placeName,
    }
  },
})
export default class CommunityDetail extends Vue {
  communityDetails = {}
  censusSubdivision = {}
  panels = [0, 1, 2, 3, 4]

  // Methods

  get groupedLocations() {
    return groupBy(this.communityDetails.locations, 'type')
  }

  get isCommunityEmpty() {
    return isEmpty(this.communityDetails)
  }

  get communityDisplayFields() {
    const dfs = this.communityDetails.display_fields.filter((v) => {
      return v.value
    })
    if (!dfs) {
      return []
    }
    return dfs.filter((df) => this.filterCommunityDetailFields(df))
  }

  get placeName() {
    const dfs = this.communityDetails.display_fields
    if (!dfs) {
      return ''
    }
    const placeName = dfs.find((df) => df.key === 'place_name')
    return placeName?.value
  }

  filterCommunityDetailFields(field) {
    if (field.key === 'census_subdivision_id') {
      return false
    } else if (field.key === 'fn_community_name' && !field.value) {
      return false
    }
    return true
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
    map.addControl(new mapboxgl.FullscreenControl())
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
    console.log(this.communityDetails)
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
  height: 70vmin;
}

.community-list {
  width: 800px;
  margin: 0 auto;
}

.powerbi-reports {
  /* 960px powerBI report + 24px padding on each side */
  max-width: 1008px;
  margin: 0 auto;
}

.legend-icon {
  height: 2px;
  float: right;
  width: 35px;
  margin-right: 50%;
  margin-top: 10px;
}

.legend {
  bottom: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px;
  position: absolute;
  right: 10px;
  z-index: 1;
  width: 180px;
}

.community-details-sidebar {
  position: fixed;
  left: 0;
  top: 66px;
  bottom: 0;
  width: 300px;
  z-index: 10;
  background-color: white;
  overflow-y: auto;
}

.comm-details-content {
  margin-left: 300px;
}
</style>
