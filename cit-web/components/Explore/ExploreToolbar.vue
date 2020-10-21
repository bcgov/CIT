<template>
  <div>
    <v-toolbar>
      <v-btn
        :disabled="mapView"
        class="text-capitalize"
        @click="$emit('change', 'Map')"
        >View Map</v-btn
      >
      <v-btn
        :disabled="!mapView"
        class="text-capitalize"
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
