<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0">
      <v-card-title class="ma-0 pa-0 text-body-1 font-weight-normal"
        >Regional Districts</v-card-title
      >
      <v-card-text class="ma-0 pa-0">
        <div class="d-flex align-center regionalLegend"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'WildfireLegend',
})
export default class RegionalLegend extends Vue {}
</script>
<style lang="scss" scoped>
.regionalLegend {
  width: 100px;
  height: 5px;
  background-color: hsl(40, 100, 47, 0.42);
}
</style>
