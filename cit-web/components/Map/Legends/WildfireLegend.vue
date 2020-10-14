<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0">
      <v-card-title class="ma-0 pa-0 text-body-1 font-weight-normal"
        >Wildfire</v-card-title
      >
      <v-card-text class="ma-0 pa-0">
        <div>
          Risk Level 1
          <div class="risk risk-1 d-inline-block"></div>
        </div>
        <div>
          Risk Level 2
          <div class="risk risk-2 d-inline-block"></div>
        </div>
        <div>
          Risk Level 3
          <div class="risk risk-3 d-inline-block"></div>
        </div>
        <div>
          Risk Level 4
          <div class="risk risk-4 d-inline-block"></div>
        </div>
        <div>
          Risk Level 5
          <div class="risk risk-5 d-inline-block"></div>
        </div>
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
.risk {
  width: 100px;
  height: 10px;
}
.risk-1 {
  background-color: hsl(0, 100, 58, 0.3);
}
.risk-2 {
  background-color: hsl(13, 99, 46, 0.3);
}
.risk-3 {
  background-color: hsl(39, 99, 46, 0.3);
}
.risk-4 {
  background-color: hsl(49, 99, 46, 0.3);
}
.risk-5 {
  background-color: hsl(65, 99, 46, 0.3);
}
</style>
