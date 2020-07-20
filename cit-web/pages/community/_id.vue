<template>
  <div class="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { getCommunity } from '~/api/cit-api'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component()
export default class MyComponent extends Vue {
  asyncData({ $config: { MAPBOX_API_KEY } }) {
    return {
      MAPBOX_API_KEY,
    }
  }

  addNavigationControl(map) {
    map.addControl(new mapboxgl.NavigationControl())
  }

  getMapboxOptions() {
    return {
      container: 'map',
      style: 'mapbox://styles/countable-web/ckci0202t2kue1is2cqoe7wv1',
      center: [-122.970072, 49.299062],
      zoom: 12,
    }
  }

  created() {
    mapboxgl.accessToken = this.MAPBOX_API_KEY
  }

  mounted() {
    const cid = this.$route.params?.id
    const options = this.getMapboxOptions()
    const map = new mapboxgl.Map(options)
    this.addNavigationControl(map)

    getCommunity(cid).then((response) => console.log(response))
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
