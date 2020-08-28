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
      style: 'mapbox://styles/countable-web/ckedm40a4024t19oak9soly3m',
      center: [-122.970072, 49.299062],
      zoom: 12,
    })

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      this.mapLoaded = true
    })

    map.on('moveend', (e) => {
      const features = map.queryRenderedFeatures(null, {
        layers: ['communities'],
      })

      const sourceFeatures = map.querySourceFeatures('composite', {
        sourceLayer: 'communites-dh2ers',
      })
      console.log('Source Feat', sourceFeatures)
      this.$emit('moveend', {
        features,
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
</style>
