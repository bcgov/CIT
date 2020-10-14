<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0">
      <v-card-title class="ma-0 pa-0 text-body-1 font-weight-normal"
        >Census Subdivision</v-card-title
      >
      <v-card-text class="ma-0 pa-0">
        <div class="censuslegend"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'WildfireLegend',
})
export default class Wildfire extends Vue {}
</script>
<style lang="scss" scoped>
.censuslegend {
  width: 100px;
  height: 5px;
  background-color: hsl(0, 100, 55, 0.2);
}
</style>
