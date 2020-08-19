<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
@Component
export default class Map extends Vue {
  map = null
  @Prop({ default: null, type: String }) apiKey

  created() {
    mapboxgl.accessToken = this.apiKey
  }

  handleClick(e) {
    console.log('handle click', e)
  }

  getMapboxOptions() {
    return {
      container: 'map',
      style: 'mapbox://styles/countable-web/cke0cewn61ad819mwna5vri6c',
      center: [-122.970072, 49.299062],
      zoom: 5,
    }
  }

  mounted() {
    this.$root.$on('map-resize', () => {
      this.$nextTick(() => {
        this.map.resize()
      })
    })
    const options = this.getMapboxOptions()
    this.map = new mapboxgl.Map(options)
    this.map.on('click', (e) => {
      const features = this.map.queryRenderedFeatures(e.point)
      console.log(features)
    })

    this.map.on('styledata', () => {
      this.map.setFilter('communites-16y376', [
        '==',
        ['get', 'place_name'],
        'Vancouver',
      ])
    })

    window.mapboxmap = this.map
  }
}
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
