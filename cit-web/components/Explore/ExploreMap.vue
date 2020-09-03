<template>
  <div style="position: relative; height: 100%; width: 100%;">
    <div id="map"></div>
    <div ref="searchMove" class="searchMove">
      <SearchAsMove></SearchAsMove>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// import ControlFactory from '~/utils/map'
import SearchAsMove from '~/components/Explore/SearchAsMove.vue'

@Component({
  SearchAsMove,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: String }) mapboxApiKey

  created() {
    this.map = null
    this.mapLoaded = false
  }

  mounted() {
    this.initMap()
    this.addControls()
    this.listenToEvents()
  }

  initMap() {
    const mapboxgl = window.mapboxgl
    mapboxgl.accessToken = this.mapboxApiKey
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0/draft',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })
    this.map = map
  }

  whenMapLoaded(fn) {
    if (this.mapLoaded) {
      fn(this.map)
    } else {
      console.log('Waiting for map to load')
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
      this.mapLoaded = true
      this.$emit('exploreMapLoaded', this.map)
    })

    this.map.on('moveend', (e) => {
      const sourceFeatures = this.map.querySourceFeatures('composite', {
        sourceLayer: 'communities-bdyfif',
      })
      this.$emit('moveend', {
        sourceFeatures,
      })
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
