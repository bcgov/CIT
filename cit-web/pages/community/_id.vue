<template>
  <div class="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component()
export default class MyComponent extends Vue {
  asyncData({ $config: { MAPBOX_API_KEY } }) {
    return {
      MAPBOX_API_KEY,
    }
  }

  mounted() {
    mapboxgl.accessToken = this.MAPBOX_API_KEY
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
