<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0">
      <v-card-title class="ma-0 pa-0 text-body-1 font-weight-normal"
        >Reserves</v-card-title
      >
      <v-card-text class="ma-0 pa-0">
        <div class="reserveslegend"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'WildfireLegend',
})
export default class ReservesLegend extends Vue {}
</script>
<style lang="scss" scoped>
.reserveslegend {
  width: 100px;
  height: 5px;
  background-color: hsl(59, 100, 43, 0.31);
}
</style>
