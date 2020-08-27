<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component()
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
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      this.mapLoaded = true
    })

    map.on('moveend', (e) => {
      console.log(e)
      const features = map.queryRenderedFeatures(null, {
        layers: ['communities-5t7ins'],
      })
      console.log(features)
    })
  }
}
</script>
<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
