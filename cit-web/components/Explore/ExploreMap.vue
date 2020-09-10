<template>
  <div style="position: relative; height: 100%; width: 100%;">
    <div id="map"></div>
    <div ref="searchMove" class="searchMove">
      <SearchAsMove></SearchAsMove>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
// import ControlFactory from '~/utils/map'
import SearchAsMove from '~/components/Explore/SearchAsMove.vue'
const commModule = namespace('communities')

@Component({
  SearchAsMove,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: String }) mapboxApiKey
  @commModule.Getter('getCommunityGeoJSON') communityGeoJSON
  created() {
    this.map = null
    this.mapLoaded = false
  }

  mounted() {
    this.initMap()
    this.addControls()
    this.listenToEvents()
    console.log(this.communityGeoJSON)
  }

  initMap() {
    const mapboxgl = window.mapboxgl
    mapboxgl.accessToken = this.mapboxApiKey
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })
    this.map = map
  }

  addSources() {
    this.map.addSource('communities', {
      type: 'geojson',
      data: this.communityGeoJSON,
    })
  }

  addLayers() {
    this.map.addLayer({
      id: 'communities',
      type: 'symbol',
      source: 'communities',
      layout: {
        'text-field': ['to-string', ['get', 'place_name']],
        'text-size': 13,
        'icon-image': 'communities',
        'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 15, 1],
        'text-offset': [0, 1],
        'text-optional': true,
        'icon-allow-overlap': ['step', ['zoom'], false, 8, true],
        'icon-padding': 0,
      },
      paint: { 'text-halo-width': 1, 'text-halo-blur': 1 },
    })
  }

  whenMapLoaded(fn) {
    if (this.mapLoaded) {
      fn(this.map)
    } else {
      this.$on('exploreMapLoaded', (map) => {
        fn(map)
      })
    }
  }

  addControls() {
    const mapboxgl = window.mapboxgl
    this.map.addControl(new mapboxgl.NavigationControl())
    // map.addControl(new ControlFactory(this.$refs.searchMove), 'bottom-right')
  }

  listenToEvents() {
    this.$root.$on('recenterMap', (d) => {
      this.whenMapLoaded((map) => {
        map.flyTo({
          center: d,
          zoom: 12,
          speed: 2.5,
          essential: true,
        })
      })
    })

    this.map.on('load', () => {
      this.addSources()
      this.addLayers()
      this.mapLoaded = true
      this.$emit('exploreMapLoaded', this.map)
    })

    this.map.on('moveend', (e) => {
      console.log(this.map.queryRenderedFeatures())
      const sourceFeatures = this.map.querySourceFeatures('communities', {
        sourceLayer: 'communities',
      })
      this.$emit('moveend', {
        sourceFeatures,
      })
    })

    this.map.on('click', 'communities', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice()
      const name = e.features[0].properties.place_name
      const cid = e.features[0].properties.pk
      console.log(e.features[0])

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      new window.mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `<a target="_blank" href="/community/${cid}">go</a> to ${name} details.`
        )
        .addTo(this.map)
    })

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'communities', () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'communities', () => {
      this.map.getCanvas().style.cursor = ''
    })
  }
}
</script>
<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}

.searchMove {
  position: absolute;
  width: 100%;
  top: 10px;
  left: 0;
  right: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
