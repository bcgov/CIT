<template>
  <div>
    <v-toolbar>
      <v-btn
        color="primary"
        class="text-capitalize rounded-0 et-button"
        :text="!mapView"
        @click="$emit('change', 'Map')"
        >View Map</v-btn
      >
      <v-btn
        color="primary"
        :text="mapView"
        class="text-capitalize rounded-0 et-button"
        @click="$emit('change', 'Reports')"
        >View Reports</v-btn
      >
    </v-toolbar>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Explore extends Vue {
  @Prop() mapView
}
</script>
<style lang="scss" scoped>
.et-button {
  border: 1px solid #073366 !important;
}

.et-button:first-of-type {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}

.et-button:nth-of-type(2) {
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}
</style>
