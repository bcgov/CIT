<template>
  <div>
    <div
      class="text-center text-button font-weight-bold ma-0 pa-0"
      style="line-height: 1;"
    >
      {{ range[0] }} km to {{ range[1] }} km
    </div>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      hide-details
      class="align-center mt-0"
      @end="$emit('end', range)"
    ></v-range-slider>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AssetSlider extends Vue {
  min = 0
  max = 50
  range = [this.min, this.max]
}
</script>
