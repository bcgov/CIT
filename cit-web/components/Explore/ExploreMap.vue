<template>
  <div style="width: 100%; height: 100%;">
    <div id="map"></div>
    <!--
    <div ref="searchMove" class="searchMove">
      <SearchAsMove></SearchAsMove>
    </div>
    -->
    <div class="explore-controls-container">
      <CommunityPopup
        ref="communityPopUp"
        :name="communityPopUpName"
        :cid="communityPopUpId"
        :population="communityPopUpPopulation"
      ></CommunityPopup>
      <div ref="layerSwitcher">
        <LayerSwitcher
          :layers="layerSwitcher"
          @layerToggle="handleLayerToggle"
        ></LayerSwitcher>
      </div>

      <div v-show="false" ref="locationPopup">
        <LocationPopup
          :location-type="popUpLocationType"
          :name="popUpLocationName"
        ></LocationPopup>
      </div>

      <div ref="zoomControl">
        <ZoomControl @zoomIn="zoomIn" @zoomOut="zoomOut"></ZoomControl>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import ControlFactory from '~/utils/map'
import { getPopulation, getCommunityGeoJSON } from '~/api/cit-api/'
import exploreLayers from '~/data/explore/layers.json'
@Component
export default class Explore extends Vue {
  @Prop({ default: null, type: String }) mapboxApiKey
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: null, type: Array }) clusterCommunities
  @Watch('clusterCommunities')
  handleClusterChange(nc, oc) {
    const newGeoJson = this.convertToGeoJson(nc)
    this.whenCommSourceReady((map) => {
      const clusterSource = map.getSource('communities')
      clusterSource.setData(newGeoJson)
    })
  }

  communityGeoJSON = {}
  @Watch('communityGeoJSON')
  watchCommunityGeoJSON() {
    this.whenMapLoaded((map) => {
      this.addSources()
      this.addCommunityLayers()
    })
  }

  async fetch() {
    const result = await getCommunityGeoJSON()
    this.communityGeoJSON = result.data
  }

  convertToGeoJson(data) {
    const newGeoJson = {
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      type: 'FeatureCollection',
      features: [],
    }
    data.map((c) => {
      newGeoJson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [c.longitude, c.latitude],
        },
        properties: {
          id: c.id,
          place_name: c.place_name,
        },
      })
    })
    return newGeoJson
  }

  popUpLocationType = null
  popUpLocationName = null
  communitySourcesReady = false
  communityPopUpName = null
  communityPopUpId = null
  communityPopUpPopulation = null
  popUpInstance = null
  layerSwitcher = exploreLayers

  created() {
    this.map = null
    this.mapLoaded = false
  }

  handleLayerToggle(lo) {
    const visibility = lo.visibility === true ? 'visible' : 'none'
    const layerName = lo.layerName
    this.whenMapLoaded((map) => {
      if (typeof layerName === 'string') {
        map.setLayoutProperty(layerName, 'visibility', visibility)
        return
      }
      if (Array.isArray(layerName)) {
        layerName.map((ln) =>
          map.setLayoutProperty(ln, 'visibility', visibility)
        )
      }
    })
  }

  getZoom() {
    return this.map.getZoom()
  }

  zoomIn(zoomLevel) {
    const zoom = zoomLevel || this.getZoom()
    this.map.flyTo({
      zoom: zoom + 1,
    })
  }

  zoomOut(zoomLevel) {
    const zoom = zoomLevel || this.getZoom()
    this.map.flyTo({
      zoom: zoom + -1,
    })
  }

  mounted() {
    this.initMap()
    this.addControls()
    this.listenToEvents()
    this.$nextTick(() => {
      this.whenMapLoaded((map) => map.resize())
    })
  }

  initMap() {
    const mapboxgl = window.mapboxgl
    mapboxgl.accessToken = this.mapboxApiKey
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/countable-web/ckcspnxxz0ji81iliywxxclk0',
      center: [-122.755485, 53.91988],
      zoom: 5,
    })
    this.map = map
  }

  addSources() {
    this.map.addSource('communities', {
      type: 'geojson',
      data: this.communityGeoJSON,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    })
  }

  addCommunityLayers() {
    this.map.addLayer({
      id: 'communities',
      type: 'symbol',
      source: 'communities',
      layout: {
        'text-field': ['to-string', ['get', 'place_name']],
        'text-size': 13,
        'icon-image': 'communities',
        'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 12, 1],
        'text-offset': [0, 1],
        'text-optional': true,
        'icon-allow-overlap': ['step', ['zoom'], false, 8, true],
        'icon-padding': 0,
      },
      paint: { 'text-halo-width': 1, 'text-halo-blur': 1 },
    })
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'communities',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#2176d2',
          100,
          '#2176d2',
          750,
          '#2176d2',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 16, 100, 25, 750, 36],
      },
    })
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'communities',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
      paint: {
        'text-color': '#ffffff',
      },
    })
    this.communitySourcesReady = true
    this.$emit('communitySourcesReady', this.map)
  }

  resize() {
    this.whenMapLoaded((map) => map.resize())
  }

  whenCommSourceReady(fn) {
    if (this.communitySourcesReady) {
      fn(this.map)
    } else {
      this.$on('communitySourcesReady', (map) => {
        fn(map)
      })
    }
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

  setLocationPopup(coordinates) {
    this.$nextTick(() => {
      const phtml = this.$refs.locationPopup.innerHTML
      const locationPopup = new window.mapboxgl.Popup({
        className: 'location-popup-container',
      })
      document.addEventListener('click', (e) => {
        if (
          event.target.matches('.location-popup-close-icon') ||
          event.target.matches('.location-popup-close')
        ) {
          locationPopup.remove()
        }
      })
      locationPopup.setLngLat(coordinates).setHTML(phtml).addTo(this.map)
    })
  }

  setPopUp(coordinates, cid) {
    getPopulation(cid).then((result) => {
      this.communityPopUpPopulation = result.data.population
    })
    this.$nextTick(() => {
      const phtml = this.$refs.communityPopUp.$el.innerHTML
      const communityPopUp = new window.mapboxgl.Popup({
        className: 'community-popup-container',
      })
      document.addEventListener('click', (e) => {
        if (
          event.target.matches('.community-popup-close-icon') ||
          event.target.matches('.community-popup-close')
        ) {
          communityPopUp.remove()
        }
      })
      communityPopUp.setLngLat(coordinates).setHTML(phtml).addTo(this.map)
    })
  }

  addControls() {
    const mapboxgl = window.mapboxgl
    this.map.addControl(new mapboxgl.ScaleControl({ position: 'bottom-right' }))
    this.map.addControl(
      new ControlFactory(this.$refs.layerSwitcher),
      'bottom-right'
    )
    this.map.addControl(new ControlFactory(this.$refs.zoomControl), 'top-right')
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
    this.$root.$on('communitiesChanged', (communities) => {
      if (!communities.length) return
      const bounds = communities.reduce(function (bounds, feature) {
        return bounds.extend([feature.longitude, feature.latitude])
      }, new window.mapboxgl.LngLatBounds())
      this.whenMapLoaded((map) => {
        map.fitBounds(bounds, {
          maxZoom: 12,
          padding: 30, // in px, to make markers on the top edge visible
        })
      })
    })
    this.map.on('load', () => {
      this.mapLoaded = true
      this.$emit('exploreMapLoaded', this.map)
    })
    this.map.on('moveend', (e) => {
      const sourceFeatures = this.map.querySourceFeatures('communities', {
        sourceLayer: 'communities',
      })
      this.$emit('moveend', {
        sourceFeatures,
      })
    })
    this.map.on('click', 'clusters', (e) => {
      const center = [e.lngLat.lng, e.lngLat.lat]
      const zoom = Math.floor(this.map.getZoom()) + 2
      this.flyToCenterAndZoom(center, zoom)
      /* Gets the cluster leaves
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      const cluster = features[0]
      const clusterID = cluster.properties.cluster_id
      const clusterSource = this.map.getSource('communities')
      const clusterLeaves = clusterSource.getClusterLeaves(
        clusterID,
        2000,
        0,
        (err, features) => {
          console.log('Leave features', features, err)
        }
      )
      console.log('Cluster Leaves', clusterLeaves)
      */
    })
    this.map.on('click', 'communities', (e) => {
      const cluster = this.map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      if (cluster && cluster.length > 0) {
        return
      }
      const coordinates = e.features[0].geometry.coordinates.slice()
      const name = e.features[0].properties.place_name
      const cid = e.features[0].properties.pk || e.features[0].properties.id
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      this.communityPopUpName = name
      this.communityPopUpId = cid
      this.setPopUp(coordinates, cid)
    })

    this.map.on('click', 'locations', (e) => {
      const features = this.map.queryRenderedFeatures(e.point)
      const location = features.find((f) => f.layer.id === 'locations')
      if (location) {
        const locationType = location.properties.location_type
        const locationName = location.properties.name
        this.popUpLocationType = locationType
        this.popUpLocationName = locationName
        this.setLocationPopup(e.lngLat)
      }
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

  flyToCenterAndZoom(center, zoom) {
    this.map.flyTo({
      center,
      zoom,
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
.community-popup-container,
.community-popup-container .mapboxgl-popup-content {
  padding: 0 0 0 0;
}
.explore-controls-container {
  position: fixed;
  z-index: -1;
  visibility: hidden;
}
</style>
<style lang="scss">
.community-popup-container,
.community-popup-container .mapboxgl-popup-content {
  padding: 0 0 0 0;
}
.location-popup-container,
.location-popup-container .mapboxgl-popup-content {
  padding: 0 0 0 0;
}
</style>
