<template>
  <div class="d-flex" style="flex-direction: column;">
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="primary rounded-lg"
          fab
          x-small
          style="
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          "
          v-on="on"
          @click="$emit('zoomIn')"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>
      Zoom In
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="primary rounded-lg"
          fab
          x-small
          style="
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
          "
          v-on="on"
          @click="$emit('zoomOut')"
        >
          <v-icon>mdi-minus</v-icon></v-btn
        >
      </template>
      Zoom Out
    </v-tooltip>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ZoomControl extends Vue {}
</script>
