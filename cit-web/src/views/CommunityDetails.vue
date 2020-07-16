<template>
  <div class="home">
    <h1>Community Details</h1>
    <div class="map-container">
      <div ref="map" id="map"></div>
    </div>

    <div>
      <ul>
        <li v-for="(value, key) in census" :key="key">
          <strong>{{ key }}</strong
          >: {{ value || "N/A" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
require("mapbox-gl/dist/mapbox-gl.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl");
import axios from "axios";

const MAPBOX_GL_ACCESS_TOKEN =
  "pk.eyJ1IjoiY291bnRhYmxlLXdlYiIsImEiOiJjamQyZG90dzAxcmxmMndtdzBuY3Ywa2ViIn0.MU-sGTVDS9aGzgdJJ3EwHA";
export default {
  data() {
    return {
      census: {}
    };
  },
  mounted() {
    mapboxgl.accessToken = MAPBOX_GL_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/countable-web/ckci0202t2kue1is2cqoe7wv1",
      center: [-122.970072, 49.299062],
      zoom: 12
    });
    map.addControl(new mapboxgl.NavigationControl());
    console.log(this.$route);
    const id = parseInt(this.$route.params.id);

    axios
      .get(`https://cit-test.countable.ca/api/pipeline/communities/${id}/`)
      .then(response => {
        const community = response.data;
        map.setCenter([community.longitude, community.latitude]);
        const censusSubdivision = community.census_subdivision;

        axios
          .get(
            `https://cit-test.countable.ca/api/pipeline/censussubdivisions/${censusSubdivision}`
          )
          .then(response => {
            const census = response.data;
            this.census = census;
          });
      });
  }
};
</script>
<style scoped>
.map-container {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}
#map {
  width: 100%;
  height: 100%;
}
ul li {
  display: block;
  text-align: left;
  width: 800px;
  margin: 0 auto;
}
</style>
