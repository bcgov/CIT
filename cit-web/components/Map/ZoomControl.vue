<template>
  <div class="d-flex" style="flex-direction: column;">
    <v-btn
      color="primary rounded-lg"
      fab
      x-small
      style="
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      "
      @click="$emit('zoomIn')"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
    <v-btn
      color="primary rounded-lg"
      fab
      x-small
      style="
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
      "
      @click="$emit('zoomOut')"
    >
      <v-icon>mdi-minus</v-icon></v-btn
    >
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ZoomControl extends Vue {}
</script>
