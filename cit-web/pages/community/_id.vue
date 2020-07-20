<template>
  <div>
    <MainHeader :title="placeName" subtitle="Community Details" class="mb-5" />
    <div id="map" ref="map"></div>
    <div class="community-list">
      <ul class="mt-10 mb-10">
        <li v-for="(value, key) in censusSubdivision" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MainHeader from '~/components/MainHeader.vue'
import { getCommunity, getCensusSubDivision } from '~/api/cit-api'
require('mapbox-gl/dist/mapbox-gl.css')
const mapboxgl = require('mapbox-gl/dist/mapbox-gl')

@Component({
  MainHeader,
})
export default class MyComponent extends Vue {
  censusSubdivision = []
  placeName = ''

  asyncData({ $config: { MAPBOX_API_KEY } }) {
    return {
      MAPBOX_API_KEY,
    }
  }

  addNavigationControl(map) {
    map.addControl(new mapboxgl.NavigationControl())
  }

  setCenter(map, lng, lat) {
    map.setCenter([lng, lat])
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

    getCommunity(cid)
      .then((response) => {
        const { status, data } = response
        if (status === 200) {
          console.log(data)
          const censusSubdivision = data.census_subdivision
          this.setCenter(map, data.longitude, data.latitude)
          this.placeName = data.place_name
          getCensusSubDivision(censusSubdivision).then(
            (response) => (this.censusSubdivision = response.data)
          )
        }
      })
      .catch((e) => console.error(e))
  }
}
</script>
<style lang="scss" scoped>
#map {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}

.community-list {
  width: 800px;
  margin: 0 auto;
}
</style>
