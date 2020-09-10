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
                  :place-name="placeName"
                  :grouped-locations="groupedLocations"
                  :population="getFieldValue('population')"
                  :grouped-census="groupedCensus"
                  @expand="handleExpand"
                  @findOnMap="handleFind"
                ></Sidebar>
                <div id="map" ref="map"></div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12">
              <div class="mt-10">
                <h2>Reports</h2>
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
            :place-name="placeName"
            :community="communityDetails"
            :report-cards="reportCards"
            :cid="communityDetails.id"
            :selected-report-name.sync="selectedReportName"
          ></ReportSection>
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
    </div>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import Breadcrumbs from '~/components/CommunityDetails/Breadcrumbs.vue'
import Sidebar from '~/components/CommunityDetails/Sidebar.vue'
import ReportSection from '~/components/CommunityDetails/ReportSection.vue'
import LegendControl from '~/components/CommunityDetails/LegendControl.vue'
import MainHeader from '~/components/MainHeader.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import CensusSubdivision from '~/components/CommunityDetails/CensusSubdivision.vue'
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
  selectedReportName = null

  // Methods

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

  handleExpand(e) {
    const { active, group } = e
    console.log(group)
    if (active === false) {
      this.whenMapLoaded((map) => {
        map.setFilter('locations-2bvop8-label', [
          '==',
          ['get', 'location_type'],
          group,
        ])
      })
    } else {
      this.whenMapLoaded((map) => {
        map.setFilter('locations-2bvop8-label', null)
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
    console.log(temp)
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

  getControlFactory() {
    return class getControlFactory {
      el = null
      constructor(el) {
        this.el = el
      }

      onAdd(map) {
        this.map = map
        this.container = document.createElement('div')
        this.container.className = 'mapboxgl-ctrl'
        this.container.appendChild(this.el)
        return this.container
      }

      onRemove() {
        this.container.parentNode.removeChild(this.container)
        this.map = undefined
      }
    }
  }

  async fetch({ store }) {
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

    const MapBoxControl = this.getControlFactory()
    const centerControl = new MapBoxControl(this.$refs.centerControl)
    map.addControl(centerControl, 'top-right')

    const legendControl = new MapBoxControl(this.$refs.legendControl)
    map.addControl(legendControl, 'bottom-right')

    map.on('click', function (e) {
      console.log(e)
      const features = map.queryRenderedFeatures(e.point)
      console.log('Features', features)
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
      /*
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: 'composite',
        'source-layer': 'locations-2bvop8',
        layout: {
          'text-optional': true,
          'text-line-height': 0.9,
          'text-size': 13,
          'icon-image': ['to-string', ['get', 'location_type']],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'icon-allow-overlap': ['step', ['zoom'], false, 11, true],
          visibility: 'none',
          'text-offset': [0, 1.5],
          'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 15, 1],
          'text-field': ['to-string', ['get', 'name']],
          'icon-padding': 0,
          'text-max-width': 15,
        },
        paint: {
          'text-halo-color': 'hsl(0, 0%, 100%)',
          'text-halo-width': 1,
          'icon-opacity': ['interpolate', ['linear'], ['zoom'], 0, 1, 22, 1],
        },
      })
      */
      map.setLayoutProperty('locations', 'visibility', 'visible')
      this.mapLoaded = true
      this.$root.$emit('comm-map-loaded', this.map)
    })
  }

  @Watch('$route.query', { immediate: true, deep: true })
  onUrlChange(queryParams) {
    if (queryParams.report) {
      this.selectedReportName = queryParams.report
    } else {
      this.selectedReportName = null
    }
  }

  @Watch('selectedReportName')
  onSelectedReportNameChange() {
    if (this.selectedReportName) {
      this.$router.push({ query: { report: this.selectedReportName } })
    } else {
      this.$router.push({ query: {} })
    }
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
