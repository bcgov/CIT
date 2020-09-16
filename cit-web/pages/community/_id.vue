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
              <div class="map-container elevation-5">
                <Sidebar
                  :district="regionalDistrictName"
                  :place-name="placeName"
                  :grouped-locations="groupedLocations"
                  :population="getFieldValue('population')"
                  :grouped-census="groupedCensus"
                  @expand="handleExpand"
                  @findOnMap="handleFind"
                  @viewReports="viewReports"
                ></Sidebar>
                <div id="map" ref="map"></div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <div class="mt-10">
                <h2>View Reports &amp; Compare</h2>
                <h6 class="subtitle-1">
                  Choose a report to view community data within that topic, and
                  compare to the average for the regional district, or all of
                  BC.
                </h6>
                <v-divider class="mt-5"></v-divider>
              </div>
            </v-col>
          </v-row>
          <ReportSection
            ref="reportSection"
            :place-name="placeName"
            :community="communityDetails"
            :report-cards="reportCards"
            :cid="communityDetails.id"
            @openReport="handleOpen"
          ></ReportSection>

          <v-row>
            <v-col col="12">
              <div class="mt-10">
                <h2>Miscellaneous</h2>
                <h6 class="subtitle-1">
                  Other items that may be of interest
                </h6>
                <v-divider class="mt-5"></v-divider>
                <v-btn color="primary" class="mt-5" @click="dialog = true"
                  >View Raw Data
                  <v-icon right dark>mdi-database</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div ref="centerControl" @click="handleResetCenter">
        <v-btn x-small fab color="primary">
          <v-icon small>mdi-bullseye</v-icon>
        </v-btn>
      </div>

      <div ref="legendControl">
        <LegendControl></LegendControl>
      </div>

      <div ref="layerSwitcher">
        <LayerSwitcher
          :layers="layerSwitcher"
          @layerToggle="handleLayerToggle"
        ></LayerSwitcher>
      </div>

      <v-dialog v-model="dialog" max-width="800">
        <v-toolbar color="primary" dense elevation="3">
          <v-toolbar-title style="color: white;">{{
            placeName
          }}</v-toolbar-title>
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
  </div>
</template>

<script>
import { Component, Vue, Watch, namespace } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import Breadcrumbs from '~/components/CommunityDetails/Breadcrumbs.vue'
import Sidebar from '~/components/CommunityDetails/Sidebar.vue'
import ReportSection from '~/components/CommunityDetails/ReportSection.vue'
import LegendControl from '~/components/CommunityDetails/LegendControl.vue'
import MainHeader from '~/components/MainHeader.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import LayerSwitcher from '~/components/LayerSwitcher'

import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import ControlFactory from '~/utils/map'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'
import {
  getCommunity,
  getCensusSubDivision,
  getDataSourceList,
  getCommunityList,
  getRegionalDistricts,
} from '~/api/cit-api'
import { yesno } from '~/utils/filters'
import { getAuthToken } from '~/api/ms-auth-api/'
import LocationCard from '~/components/Location/LocationCard.vue'
import reportPages from '~/data/communityDetails/reportPages.json'
const commModule = namespace('communities')
const reportModule = namespace('report')
@Component({
  Breadcrumbs,
  Sidebar,
  ReportCard,
  LegendControl,
  ReportSection,
  LocationCard,
  MainHeader,
  CensusSubdivision,
  Report,
  LayerSwitcher,
  filters: {
    yesno,
  },
})
export default class CommunityDetail extends Vue {
  layers = true
  communityDetails = {}
  censusSubdivision = {}
  mapLoaded = false
  panels = [0, 1, 2, 3, 4]
  reportCards = reportPages
  dialog = false
  citFeedbackEmail = this.$config.citFeedbackEmail
  layerSwitcher = [
    {
      layerName: 'locations',
      layerLabel: 'Locations',
    },
  ]

  handleLayerToggle(lo) {
    const visibility = lo.visibility === true ? 'visible' : 'none'
    this.whenMapLoaded((map) => {
      map.setLayoutProperty(lo.layerName, 'visibility', visibility)
    })
  }

  @commModule.Getter('getRegionalDistricts') regionalDistricts
  @reportModule.Getter('getSelectedReportName') selectedReportName
  @reportModule.Mutation('setSelectedReportName') setSelectedReportName

  handleOpen(reportName) {
    this.$router.push({
      query: {
        report: reportName,
      },
    })
    this.setSelectedReportName(reportName)
  }

  @Watch('$route.query')
  handleQueryWatch(query) {
    if (!query.report) {
      this.setSelectedReportName(null)
    } else {
      this.handleOpen(query.report)
    }
  }

  get regionalDistrictName() {
    const rd = this.regionalDistricts.find(
      (rd) => rd.id === this.communityDetails.regional_district
    )
    return rd && rd.name
  }

  get breadcrumbs() {
    return [
      {
        text: 'Home',
        href: '',
      },
      {
        text: 'Explore',
        href: '',
      },
      {
        text: this.placeName,
        href: '',
      },
    ]
  }

  viewReports() {
    this.$vuetify.goTo(this.$refs.reportSection, {
      offset: 200,
    })
  }

  handleExpand(e) {
    const { active, group } = e
    if (active === false) {
      this.whenMapLoaded((map) => {
        map.setFilter('locations', ['==', ['get', 'location_type'], group])
      })
    } else {
      this.whenMapLoaded((map) => {
        map.setFilter('locations', null)
      })
    }
  }

  get groupedCensus() {
    if (this.censusSubdivision.groups) {
      return groupBy(this.censusSubdivision.groups, 'group')
    }
    return {}
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

  getFieldValue(field) {
    const dfs = this.communityDetails.display_fields
    if (!dfs) {
      return ''
    }
    const temp = dfs.find((df) => df.key === field)
    return temp?.value
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

  async fetch({ store, query }) {
    const results = await Promise.all([
      getRegionalDistricts(),
      getCommunityList(),
      getAuthToken(),
      getDataSourceList(),
    ])
    const regionalDistricts = results[0].data.results
    store.commit('communities/setRegionalDistricts', regionalDistricts)
    const communityList = results[1].data
    store.commit('communities/setCommunities', communityList)
    const accessToken = results[2].data.access_token
    store.commit('msauth/setAccessToken', accessToken)
    const dataSources = results[3].data
    store.commit('communities/setDataSources', dataSources)
    if (query.report) {
      store.commit('report/setSelectedReportName', query.report)
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

      const groupedLocations = map(
        groupBy(communityDetails.locations, 'type'),
        (o, k) => {
          return {
            group: k,
            locations: o,
            active: false,
          }
        }
      )

      return {
        MAPBOX_API_KEY,
        communityDetails,
        censusSubdivision,
        groupedLocations,
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
    map.addControl(
      new window.mapboxgl.ScaleControl({ position: 'bottom-right' })
    )
  }

  handleResetCenter() {
    const zoom = 12
    this.whenMapLoaded((map) => {
      this.resetCenter(
        map,
        this.communityDetails.longitude,
        this.communityDetails.latitude,
        zoom
      )
    })
  }

  resetCenter(map, lng, lat, zoom) {
    map.setCenter([lng, lat])
    map.setZoom(zoom)
  }

  setCenter(map, lng, lat) {
    map.setCenter([lng, lat])
  }

  getMapboxOptions() {
    return {
      container: 'map',
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0/draft',
      center: [-122.970072, 49.299062],
      zoom: 12,
    }
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

  listenToEvents() {
    this.$root.$on('map-find', (center) => {
      this.handleFind(center)
    })
  }

  mounted() {
    this.listenToEvents()

    window.mapboxgl.accessToken = this.MAPBOX_API_KEY
    const mapboxgl = window.mapboxgl

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

    const centerControl = new ControlFactory(this.$refs.centerControl)
    map.addControl(centerControl, 'top-right')

    map.addControl(new ControlFactory(this.$refs.layerSwitcher), 'bottom-right')

    const legendControl = new ControlFactory(this.$refs.legendControl)
    map.addControl(legendControl, 'bottom-right')

    map.on('click', function (e) {
      const features = map.queryRenderedFeatures(e.point)
      const location = features.find(
        (f) => f.sourceLayer === 'locations-2bvop8'
      )
      if (location) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `<p>${location.properties.name}</p>
            <a href="mailto:networkbc@gov.bc.ca?subject=CIT Feedback" class="ml-2 v-btn v-btn--depressed theme--light v-size--small info"><span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mr-2 mdi mdi-comment theme--light" style="font-size:16px;"></i>
              Give Feedback
            </span></a>`
          )
          .addTo(map)
      }
    })

    map.on('load', () => {
      map.setLayoutProperty('locations', 'visibility', 'visible')
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
