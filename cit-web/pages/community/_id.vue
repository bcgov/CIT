V<template>
  <div class="community-new-container">
    <div v-if="isCommunityEmpty" class="d-flex mt-5 justify-center">
      <v-alert type="info">
        Sorry, we could not find a community with that ID.
      </v-alert>
    </div>
    <div v-else>
      <div class="comm-details-content">
        <v-container fluid>
          <v-row no-gutters>
            <v-col :cols="12">
              <v-breadcrumbs class="pa-0 ma-0 mb-7 mt-3" :items="breadcrumbs">
                <template v-slot:divider>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-breadcrumbs>
              <div class="map-container elevation-5">
                <div class="community-details-sidebar">
                  <div class="pt-5 pb-5">
                    <div class="d-flex justify-center">
                      <v-icon large>mdi-map-legend</v-icon>
                      <h2>{{ placeName }}</h2>
                    </div>
                    <h6 class="text-center">Population: 603502</h6>
                    <div class="text-center">
                      <v-btn color="primary" x-small @click="dialog = true"
                        >View Raw Data
                        <v-icon right dark>mdi-database</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <v-divider></v-divider>

                  <v-list dense nav class="ma-0">
                    <v-list-group
                      :v-model="true"
                      :prepend-icon="'mdi-map'"
                      no-action
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title>
                            Legends
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>

                      <div class="d-flex align-center mt-0">
                        <h5 class="ml-3">Broadband Speeds</h5>
                        <v-spacer></v-spacer>
                        <v-switch
                          class="mt-0"
                          hide-details
                          dense
                          :v-model="true"
                        ></v-switch>
                      </div>
                    </v-list-group>
                    <v-list-group
                      :v-model="true"
                      :prepend-icon="'mdi-map'"
                      no-action
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title>
                            Layers
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>

                      <v-list-item-content>
                        <div class="d-flex align-center mt-0">
                          <h5 class="ml-3">Schools</h5>
                          <v-spacer></v-spacer>
                          <v-switch
                            class="mt-0"
                            hide-details
                            dense
                            :v-model="true"
                          ></v-switch>
                        </div>
                        <div class="d-flex align-center mt-0">
                          <h5 class="ml-3">Hospitals</h5>
                          <v-spacer></v-spacer>
                          <v-switch
                            class="mt-0"
                            hide-details
                            dense
                            :v-model="true"
                          ></v-switch>
                        </div>
                      </v-list-item-content>
                    </v-list-group>
                  </v-list>
                  <v-divider></v-divider>
                  <v-list dense nav>
                    <v-list-group
                      v-for="(locationGroup, key) in groupedLocations"
                      :key="key"
                      :v-model="true"
                      :prepend-icon="getLocationMetaData(key).icon"
                      no-action
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ startCase(key) }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-chip x-small class="font-weight-bold ma-0 ml-0">
                          {{ locationGroup.length }}
                        </v-chip>
                      </template>

                      <div
                        v-for="location in locationGroup"
                        :key="location.id"
                        class="pa-2"
                      >
                        <LocationCard
                          :location="location"
                          :type="key"
                          @map-find="handleFind"
                        ></LocationCard>
                      </div>
                    </v-list-group>
                  </v-list>
                </div>
                <div id="map" ref="map"></div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <div class="mt-10">
                <h2>Reports</h2>
                <h6 class="subtitle-1">Description can go here....</h6>
                <v-divider class="mt-5"></v-divider>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <h3 class="d-flex align-center">
                <v-icon inline class="mr-3" color="primary">mdi-home</v-icon
                >Housing
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Housing"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Families"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Education"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Culture"
              ></ReportCard>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <h3 class="d-flex align-center">
                <v-icon inline class="mr-3" color="primary"
                  >mdi-currency-usd</v-icon
                >Economics/Employment
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Income/Jobs"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Natural Resources"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Environment"
              ></ReportCard>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <h3 class="d-flex align-center">
                <v-icon inline class="mr-3" color="primary">mdi-road</v-icon
                >Assets & Infrastructure
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Healthcare"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Government Services"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Emergency Responses"
              ></ReportCard>
            </v-col>
            <v-col xl="3" lg="3">
              <ReportCard
                page-name="ReportSection05fe7b2a55e727a0a41e"
                :cid="communityDetails.id"
                extra-classname="demographics"
                title="Connectivity"
              ></ReportCard>
            </v-col>
          </v-row>
        </v-container>
        <!--
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
        -->
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="800">
      <v-toolbar color="primary" dense elevation="3">
        <v-toolbar-title style="color: white;">{{ placeName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
      </v-toolbar>
      <v-card>
        <v-col
          v-for="(value, key) in groupedCensus"
          :key="key"
          class="mb-5"
          cols="12"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">{{
              key === 'null' ? 'Miscellaneous' : key
            }}</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item v-for="item in value" :key="item.key">
                <v-list-item-content>{{
                  item.metadata.name
                }}</v-list-item-content>
                <v-list-item-content class="align-end justify-center"
                  >{{ item.value || 'No data'
                  }}{{ item.value ? item.units : '' }}</v-list-item-content
                >
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import startCase from 'lodash/startCase'
import MainHeader from '~/components/MainHeader.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'
import {
  getCommunity,
  getCensusSubDivision,
  getCommunityList,
} from '~/api/cit-api'
import { yesno } from '~/utils/filters'
import { getAuthToken } from '~/api/ms-auth-api/'
import LocationCard from '~/components/Location/LocationCard.vue'

@Component({
  ReportCard,
  LocationCard,
  MainHeader,
  CensusSubdivision,
  Report,
  filters: {
    yesno,
  },
  methods: {
    startCase,
  },
  head() {
    return {
      title: this.placeName,
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
export default class CommunityDetail extends Vue {
  layers = true
  communityDetails = {}
  censusSubdivision = {}
  dialog = false
  mapLoaded = false
  panels = [0, 1, 2, 3, 4]

  // Methods

  get breadcrumbs() {
    const temp = [
      {
        text: 'Home',
        href: '',
      },
      {
        text: 'Explore',
        href: '',
      },
    ]
    temp.push({
      text: this.placeName,
      href: '',
    })
    return temp
  }

  get groupedCensus() {
    if (this.censusSubdivision.groups) {
      return groupBy(this.censusSubdivision.groups, 'group')
    }
    return {}
  }

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

  async fetch({ store }) {
    try {
      const response = await getAuthToken()
      const { status } = response
      if (status === 200) {
        const accessToken = response.data && response.data.access_token
        if (accessToken) {
          store.commit('msauth/setAccessToken', accessToken)
        }
      }
    } catch (e) {
      store.commit('msauth/setAccessToken', null)
    }

    try {
      const response = await getCommunityList()
      const { status } = response
      if (status === 200) {
        const communities = response.data
        if (communities) {
          store.commit('communities/setCommunities', communities)
        }
      }
    } catch (e) {
      store.commit('communities/setCommunities', [])
    }
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
    map.addControl(new window.mapboxgl.NavigationControl())
    map.addControl(new window.mapboxgl.FullscreenControl())
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

  getLocationMetaData(location) {
    const metaData = {
      schools: {
        icon: 'mdi-school',
      },
      hospitals: {
        icon: 'mdi-hospital-box',
      },
    }

    if (!metaData[location]) {
      return {
        icon: 'mdi-school',
      }
    }
    return metaData[location]
  }

  handleFind(center) {
    this.whenMapLoaded((map) => {
      map.flyTo({
        center,
        zoom: 17,
        essential: true,
      })
    })
  }

  whenMapLoaded(cb) {
    if (this.mapLoaded) {
      cb(this.map)
    } else {
      this.$root.$on('comm-map-loaded', cb)
    }
  }

  created() {
    this.map = null
  }

  mounted() {
    this.whenMapLoaded((map) => {
      console.log('Map Loaded Event', map)
    })
    window.mapboxgl.accessToken = this.MAPBOX_API_KEY
    const mapboxgl = window.mapboxgl

    console.log(this.communityDetails)
    if (this.isCommunityEmpty) {
      return
    }
    const options = this.getMapboxOptions()
    const map = new mapboxgl.Map(options)
    this.map = map
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

    map.on('load', () => {
      this.mapLoaded = true
      this.$root.$emit('comm-map-loaded', this.map)
    })
  }
}
</script>
<style lang="scss" scoped>
.community-new-container {
  width: 1600px;
  margin: 0 auto;
}
#map {
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 70vmin;
  display: flex;
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
  width: 300px;
  background-color: white;
  overflow-y: auto;
}
</style>
<style lang="scss">
.community-details-sidebar .v-list-group__header__prepend-icon {
  margin-right: 16px !important;
}
.community-details-sidebar .v-list-group__header__append-icon {
  min-width: auto !important;
  margin-left: 0 !important;
}
</style>
