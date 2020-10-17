<template>
  <div style="height: 100%; width: 100%;">
    <div id="map" ref="map" style="height: 100%; width: 100%;"></div>

    <div ref="centerControl" @click="handleResetCenter">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="primary"
            x-small
            fab
            class="rounded-lg text-capitalize"
            v-on="on"
          >
            <v-icon>mdi-bullseye</v-icon>
          </v-btn>
        </template>
        Center Community
      </v-tooltip>
    </div>

    <div ref="fullscreenControl" @click="handleFullScreen">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="primary"
            x-small
            fab
            class="rounded-lg text-capitalize"
            v-on="on"
          >
            <v-icon>mdi-arrow-expand-all</v-icon>
          </v-btn>
        </template>
        Fullscreen Enter/Exit
      </v-tooltip>
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
  </div>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ControlFactory from '~/utils/map'
import layerData from '~/data/communityDetails/layers.json'

@Component
export default class CommunityDetailsMap extends Vue {
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Object }) communityDetails
  layerSwitcher = layerData
  mapLoaded = false
  addControls(map) {
    map.addControl(new ControlFactory(this.$refs.layerSwitcher), 'bottom-right')
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

  addNavigationControl(map) {
    map.addControl(new window.mapboxgl.ScaleControl(), 'bottom-left')
    map.addControl(new ControlFactory(this.$refs.zoomControl), 'top-right')
    map.addControl(new ControlFactory(this.$refs.centerControl), 'top-right')
    map.addControl(
      new ControlFactory(this.$refs.fullscreenControl),
      'top-right'
    )
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

  created() {
    this.map = null
    this.$root.$on('cdMapFilter', ({ layerName, filters }) => {
      this.whenMapLoaded((map) => {
        map.setFilter(layerName, filters)
      })
    })
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

  whenMapLoaded(cb) {
    if (this.mapLoaded) {
      cb(this.map)
    } else {
      this.$root.$on('comm-map-loaded', cb)
    }
  }

  listenToEvents() {
    this.$root.$on('map-find', (center) => {
      this.handleFind(center)
    })
  }

  mounted() {
    window.mapboxgl.accessToken = this.$config.MAPBOX_API_KEY
    const mapboxgl = window.mapboxgl

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
    })
  }
}
</script>
