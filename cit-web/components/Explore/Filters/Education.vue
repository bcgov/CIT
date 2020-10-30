<template>
  <div>
    <v-checkbox
      v-model="k12"
      hide-details
      dense
      label="Has Any K-12 School"
    ></v-checkbox>
    <v-checkbox
      v-model="psd"
      hide-details
      dense
      label="Has Any Post-Secondary Institution"
    ></v-checkbox>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class PopGrowth extends Vue {
  k12 = false
  psd = false
}
</script>
