<template>
  <div class="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
require('mapbox-gl/dist/mapbox-gl.css')
const MAPBOX_GL_ACCESS_TOKEN =
  'pk.eyJ1IjoiY291bnRhYmxlLXdlYiIsImEiOiJjamQyZG90dzAxcmxmMndtdzBuY3Ywa2ViIn0.MU-sGTVDS9aGzgdJJ3EwHA'
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component()
export default class MyComponent extends Vue {
  mounted() {
    console.log('Mounted')
    mapboxgl.accessToken = MAPBOX_GL_ACCESS_TOKEN
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/countable-web/ckci0202t2kue1is2cqoe7wv1',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })
    map.addControl(new mapboxgl.NavigationControl())
  }
}
</script>
<style lang="scss" scoped>
.map-container {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
