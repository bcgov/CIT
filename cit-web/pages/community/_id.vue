<template>
  <div class="community-new-container">
    <div v-if="error" class="pt-10">
      <v-alert type="info" class="primary--text elevation-5">
        Oops, something went wrong! {{ error.message }}
      </v-alert>
    </div>
    <div v-else>
      <div v-if="isCommunityEmpty" class="d-flex pt-10 justify-center">
        <v-alert type="info" class="primary--text elevation-5">
          Sorry, we could not find a community with that ID.
        </v-alert>
      </div>
      <v-container v-if="!isCommunityEmpty && parentCommunity" fluid>
        <v-alert type="info" class="primary--text">
          This community is within {{ parentCommunity.name }}'s boundary.
          Consider
          <a :href="`/community/${parentCommunity.id}`" class="font-weight-bold"
            >viewing the {{ parentCommunity.name }} page instead.</a
          >
        </v-alert>
      </v-container>
      <v-container v-if="!isCommunityEmpty && !incorporated" fluid class="mt-2">
        <v-alert type="info" class="primary--text">
          This is an unincorporated community, so demographic information is
          only available for the containing census subdivision.
        </v-alert>
      </v-container>
      <div v-else>
        <div class="comm-details-content">
          <v-container fluid>
            <v-row no-gutters>
              <v-col :cols="12" class="elevation-5">
                <div class="cd-header d-flex">
                  <div
                    class="d-flex flex-column text-h5 font-weight-bold pl-10 pt-10 pb-10"
                    style="max-width: 350px;"
                  >
                    <span>{{ placeName }}</span>
                    <p
                      v-if="getFieldValue('population')"
                      class="text-caption pa-0 ma-0"
                    >
                      Population:
                      {{
                        getFieldValue('population').toLocaleString() || 'N/A'
                      }}
                    </p>

                    <a
                      :href="`/explore?tab=Map&rid=${communityDetails.regional_district}`"
                      class="text-body-1"
                    >
                      {{ regionalDistrictName }}
                    </a>
                  </div>

                  <v-img
                    class="comm-detail-header-image"
                    style="align-self: flex-end;"
                    :src="require('~/assets/images/cdheader.svg')"
                    aspect-ratio="1"
                    height="120px"
                  ></v-img>
                </div>
                <v-divider></v-divider>
                <div class="map-container">
                  <Sidebar
                    :district="regionalDistrictName"
                    :place-name="placeName"
                    :grouped-locations="filteredLocations"
                    :population="getFieldValue('population')"
                    :grouped-census="groupedCensus"
                    :rid="communityDetails.regional_district"
                    @expand="handleExpand"
                    @findOnMap="handleFind"
                    @viewReports="viewReports"
                  >
                    <div class="pl-4 pr-4">
                      <p class="text-center pa-0 ma-0 text-body-1 mt-3">
                        {{ assetModeText }}
                        <a
                          v-if="assetMode === 'driving'"
                          href="/footnotes#community-detail-asset-driving-distance"
                          target="_blank"
                          >*</a
                        >
                      </p>
                      <AssetSlider
                        v-if="assetMode === 'driving'"
                        @mouseup="handleEnd"
                      ></AssetSlider>
                      <div class="text-center">
                        <v-btn
                          small
                          color="primary"
                          class="text-body-1 text-capitalize mt-2"
                          @click="handleAssetModeChange"
                        >
                          <v-icon small class="mr-2">{{
                            assetModeButtonIcon
                          }}</v-icon>
                          {{ assetModeButtonText }}</v-btn
                        >
                      </div>
                    </div>
                  </Sidebar>
                  <div id="map" ref="map"></div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <div class="mt-10">
                  <h2>View Reports &amp; Compare</h2>
                  <h6 class="subtitle-1">
                    Choose a report to view community data within that topic,
                    and compare to the average for the regional district, or all
                    of BC.
                  </h6>
                  <v-alert
                    v-if="hasHiddenReports"
                    type="info"
                    dismissible
                    class="primary--text elevation-5"
                  >
                    This community has incomplete census data. The charts in the
                    reports reflect available census data and some reports have
                    been hidden.
                    <a href="/footnotes#incomplete-census-data" target="_blank"
                      >Learn more.</a
                    >
                  </v-alert>
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
              :report-to-open="reportToOpen"
              :reports-to-hide="communityDetails.hidden_report_pages"
              @reportOpen="reportOpen"
              @reportClose="reportClose"
            ></ReportSection>

            <v-row>
              <v-col col="12">
                <div class="mt-10">
                  <h2>Miscellaneous</h2>
                  <h6 class="subtitle-1">
                    Other items that may be of interest
                  </h6>
                  <v-divider class="mt-5"></v-divider>
                  <div class="mt-5">
                    <v-btn color="primary" @click="dialog = true"
                      >View Raw Data
                      <v-icon right dark>mdi-database</v-icon>
                    </v-btn>
                    <v-btn
                      class="ml-2"
                      :href="`mailto:${$config.citFeedbackEmail}?subject=CIT Feedback`"
                      >Give Feedback</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div ref="centerControl" @click="handleResetCenter">
          <v-btn color="primary" x-small fab class="rounded-lg text-capitalize">
            <v-icon>mdi-bullseye</v-icon>
          </v-btn>
        </div>

        <div ref="fullscreenControl" @click="handleFullScreen">
          <v-btn color="primary" x-small fab class="rounded-lg text-capitalize">
            <v-icon>mdi-arrow-expand-all</v-icon>
          </v-btn>
        </div>

        <div ref="layerSwitcher">
          <LayerSwitcher
            :layers="layerSwitcher"
            @layerToggle="handleLayerToggle"
          ></LayerSwitcher>
        </div>

        <div ref="zoomControl">
          <ZoomControl @zoomIn="zoomIn" @zoomOut="zoomOut"></ZoomControl>
        </div>

        <v-dialog
          fullscreen
          transition="dialog-bottom-transition"
          hide-overlay
          :value="showReportDialog"
          @keydown.esc.prevent="reportClose"
        >
          <v-card>
            <div
              v-if="report"
              class="report-dialog-container"
              style="padding-top: 60px;"
            >
              <v-app-bar flat dark color="primary" fixed>
                <v-btn icon dark @click="reportClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <p
                  v-if="compareMode === 'Average Of BC'"
                  class="pa-0 ma-0 ml-2"
                >
                  <span>Comparing</span>
                  <span class="font-weight-bold text-body-1">{{
                    compareMode
                  }}</span>
                </p>
                <p v-else class="pa-0 ma-0 ml-2">
                  <span>Comparing</span>
                  <span>{{ compareMode }}:</span>
                  <span
                    v-if="compare.length < 3"
                    class="text-body-1 font-weight-bold"
                    >{{ compare.join(', ') }}</span
                  >
                  <span v-else class="text-body-1 font-weight-bold">
                    <span
                      v-if="compareMode === 'Average Of Regional Districts'"
                    >
                      {{ compare.length }} Selected Regional Districts
                    </span>
                    <span v-else-if="compareMode === 'Average Of Communities'">
                      {{ compare.length }} Selected Communities
                    </span>
                  </span>
                </p>
              </v-app-bar>

              <v-container fluid>
                <v-row>
                  <v-col xl="8" lg="8" md="12" sm="12" cols="12">
                    <DetailReportSection
                      :report="report"
                      :place-name="placeName"
                      :cid="communityDetails.id"
                    ></DetailReportSection>
                  </v-col>
                  <v-col xl="4" lg="4" md="12" sm="12" cols="12">
                    <DetailCompareSection
                      :report="report"
                      :rid="communityDetails.regional_district"
                    ></DetailCompareSection>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card class="rounded-xl">
                      <ReportTraverse @traverse="reportOpen"></ReportTraverse>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-dialog>

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
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import Breadcrumbs from '~/components/CommunityDetails/Breadcrumbs.vue'
import Sidebar from '~/components/CommunityDetails/Sidebar.vue'
import ReportSection from '~/components/CommunityDetails/ReportSection.vue'
import ReportTraverse from '~/components/ReportTraverse.vue'
import MainHeader from '~/components/MainHeader.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import LayerSwitcher from '~/components/LayerSwitcher'
import DetailReportSection from '~/components/CommunityDetails/DetailReportSection.vue'
import DetailCompareSection from '~/components/CommunityDetails/DetailCompareSection.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
import ControlFactory from '~/utils/map'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'
import AssetSlider from '~/components/CommunityDetails/AssetSlider'
import {
  getCommunity,
  getCensusSubDivision,
  getDataSourceList,
  getCommunityList,
  getRegionalDistricts,
} from '~/api/cit-api'
import { yesno } from '~/utils/filters'
import ZoomControl from '~/components/Map/ZoomControl'
import { getAuthToken } from '~/api/ms-auth-api/'
import LocationCard from '~/components/Location/LocationCard.vue'
import reportPages from '~/data/communityDetails/reportPages.json'
const commModule = namespace('communities')
const compareStore = namespace('compare')
@Component({
  Breadcrumbs,
  AssetSlider,
  Sidebar,
  ReportCard,
  ReportSection,
  LocationCard,
  MainHeader,
  CensusSubdivision,
  Report,
  DetailReportSection,
  DetailCompareSection,
  LayerSwitcher,
  ZoomControl,
  ReportTraverse,
  filters: {
    yesno,
  },
})
export default class CommunityDetail extends Vue {
  head() {
    return {
      title: `${this.placeName}`,
    }
  }

  @compareStore.Getter('getCompare') compare
  @compareStore.Getter('getCompareMode') compareMode

  isHydrated = false
  sideBarHidden = false
  assetMode = 'driving'
  assetRange = [0, 50]
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
    {
      layerName: 'wildfire-zones',
      layerLabel: 'Wildfire Risk Zones',
    },
    {
      layerName: 'bc-roads',
      layerLabel: 'Roads with broadband',
    },
    {
      layerName: ['municipalities', 'municipalities-blur'],
      layerLabel: 'Municipal boundaries',
    },
    {
      layerName: ['census', 'census-label'],
      layerLabel: 'Census Subdivisions',
    },
    {
      layerName: 'reserves',
      layerLabel: 'Reserves',
    },
    {
      layerName: [
        'regional-districts-blur',
        'regional-districts',
        'regional-districts-label',
      ],
      layerLabel: 'Regional Districts',
    },
  ]

  handleEnd(data) {
    this.assetRange = [data[0], data[1]]
  }

  handleAssetModeChange() {
    if (this.assetMode === 'driving') {
      this.assetMode = 'boundary'
    } else {
      this.assetMode = 'driving'
    }
  }

  get isMobile() {
    if (this.isHydrated === true) {
      return this.$vuetify.breakpoint.width < 900
    } else {
      return false
    }
  }

  get hasHiddenReports() {
    return this.communityDetails.hidden_report_pages?.length > 0
  }

  get assetModeButtonIcon() {
    return this.assetMode === 'driving' ? 'mdi-crop-free' : 'mdi-car-side'
  }

  get filteredLocations() {
    let filtered = []
    if (this.assetMode === 'boundary') {
      filtered = this.communityDetails.locations.filter(
        (l) => l.within_municipality === true
      )
    } else {
      const [min, max] = this.assetRange
      filtered = this.communityDetails.locations.filter((l) => {
        const drivingDistance = l.driving_distance
        return drivingDistance >= min && drivingDistance <= max
      })
    }
    return map(groupBy(filtered, 'type'), (o, k) => {
      return {
        group: k,
        locations: o,
        active: false,
      }
    })
  }

  get assetModeText() {
    return this.assetMode === 'driving'
      ? 'Facilities by Driving Distance'
      : 'Facilities in Municipal Boundary'
  }

  get assetModeButtonText() {
    return this.assetMode === 'driving'
      ? 'Show By Municipal Boundary'
      : 'Show By Driving Distance'
  }

  get showReportDialog() {
    if (!this.reportToOpen) {
      return false
    } else {
      return true
    }
  }

  get report() {
    return this.reportCards.find((r) => r.name === this.reportToOpen)
  }

  handleLayerToggle(lo) {
    const visibility = lo.visibility === true ? 'visible' : 'none'
    const layerName = lo.layerName
    this.whenMapLoaded((map) => {
      if (typeof layerName === 'string') {
        map.setLayoutProperty(layerName, 'visibility', visibility)
        return
      }
      if (Array.isArray(layerName)) {
        layerName.map((ln) =>
          map.setLayoutProperty(ln, 'visibility', visibility)
        )
      }
    })
  }

  @commModule.Getter('getRegionalDistricts') regionalDistricts
  reportOpen(reportName) {
    this.$router.push({
      query: {
        report: reportName,
      },
    })
  }

  fullScreen = false
  handleFullScreen() {
    if (!this.fullScreen) {
      this.$refs.map.requestFullscreen() ||
        this.$refs.map.mozRequestFullScreen() ||
        this.$refs.map.msRequestFullscreen() ||
        this.$refs.map.webkitRequestFullscreen()
      this.fullScreen = true
    } else {
      window.document.exitFullscreen() ||
        window.document.mozCancelFullScreen() ||
        window.document.msExitFullscreen() ||
        window.document.webkitCancelFullScreen()
      this.fullScreen = false
    }
  }

  reportClose() {
    this.$router.push({
      query: {},
    })
  }

  get reportToOpen() {
    const report = this.$route.query.report
    if (!report) {
      return null
    } else {
      return report
    }
  }

  get parentCommunity() {
    return this.communityDetails.parent_community
  }

  get incorporated() {
    if (this.communityDetails?.['display_fields']) {
      const incorporated = this.communityDetails.display_fields.find(
        (df) => df.key === 'incorporated'
      )
      return incorporated.value
    } else {
      return undefined
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

  getZoom() {
    return this.map.getZoom()
  }

  zoomIn(zoomLevel) {
    const zoom = zoomLevel || this.getZoom()
    this.map.flyTo({
      zoom: zoom + 1,
    })
  }

  zoomOut(zoomLevel) {
    const zoom = zoomLevel || this.getZoom()
    this.map.flyTo({
      zoom: zoom + -1,
    })
  }

  async fetch({ store, query }) {
    try {
      const results = await Promise.all([
        getRegionalDistricts(),
        getCommunityList(),
        getDataSourceList(),
      ])
      const regionalDistricts = results[0].data.results
      store.commit('communities/setRegionalDistricts', regionalDistricts)
      const communityList = results[1].data
      store.commit('communities/setCommunities', communityList)
      const dataSources = results[2].data
      store.commit('communities/setDataSources', dataSources)
    } catch (e) {
      console.error(e)
      store.commit('communities/setRegionalDistricts', [])
      store.commit('communities/setCommunities', [])
      store.commit('communities/setDataSources', [])
    }
    try {
      const results = await Promise.all([getAuthToken()])
      const accessToken = results[0].data.access_token
      store.commit('msauth/setAccessToken', accessToken)
    } catch (e) {
      console.error(e)
      store.commit('msauth/setIsError', true)
    }
  }

  async asyncData({ params }) {
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
        communityDetails,
        censusSubdivision,
        groupedLocations,
        error: false,
      }
    } catch (e) {
      console.error('Error Message', e)
      return {
        error: e,
      }
    }
  }

  addNavigationControl(map) {
    map.addControl(new window.mapboxgl.ScaleControl(), 'bottom-left')
    map.addControl(new ControlFactory(this.$refs.zoomControl), 'top-right')
    map.addControl(new ControlFactory(this.$refs.centerControl), 'top-right')
    map.addControl(
      new ControlFactory(this.$refs.fullscreenControl),
      'top-right'
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

  addControls(map) {
    map.addControl(new ControlFactory(this.$refs.layerSwitcher), 'bottom-right')
  }

  mounted() {
    this.isHydrated = true
    this.listenToEvents()
    window.mapboxgl.accessToken = this.$config.MAPBOX_API_KEY
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
    const el = document.createElement('div')
    el.className = 'community-marker'
    const marker = new mapboxgl.Marker(el)
      .setLngLat([
        this.communityDetails.longitude,
        this.communityDetails.latitude,
      ])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + this.placeName + '</h3>')
      )
      .addTo(map)
    marker.togglePopup()
    this.addControls(map)
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
      console.log('Styles', this.map.getSource('composite'))
    })
  }
}
</script>
<style lang="scss" scoped>
.community-new-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 3em;
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
  min-width: 340px;
  background-color: white;
  overflow-y: auto;
}
@media screen and (max-width: 1400px) {
  .community-new-container {
    padding: 1em;
  }
}
@media screen and (max-width: 1000px) {
  .community-new-container {
    padding: 0;
  }

  .map-container {
    flex-direction: column;
    height: auto;
  }

  #map {
    height: 50vh;
  }

  .community-details-sidebar {
    order: 1;
  }

  .comm-detail-header-image {
    display: none;
  }

  .v-application .cd-header > h5 {
    padding: 20px !important;
  }
}

@media screen and (max-width: 477px) {
  .community-new-container {
    padding: 0;
  }

  .community-details-sidebar {
    min-width: auto;
  }
}
</style>
<style lang="scss">
.v-alert.info .v-icon {
  color: #193262;
}
.community-details-sidebar .v-list-group__header__prepend-icon {
  margin-right: 16px !important;
}
.community-details-sidebar .v-list-group__header__append-icon {
  min-width: auto !important;
  margin-left: 0 !important;
}
.community-marker {
  background-image: url('~assets/icons/communities.svg');
  background-size: cover;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
