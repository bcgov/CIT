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
    const mapboxgl = window.mapboxgl
    mapboxgl.accessToken = this.mapboxApiKey
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/countable-web/ckedm40a4024t19oak9soly3m',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })

    map.addControl(new mapboxgl.NavigationControl())
    // map.addControl(new ControlFactory(this.$refs.searchMove), 'bottom-right')

    map.on('load', () => {
      this.mapLoaded = true
    })

    map.on('moveend', (e) => {
      const sourceFeatures = map.querySourceFeatures('composite', {
        sourceLayer: 'communites-dh2ers',
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
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
