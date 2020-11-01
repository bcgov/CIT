<template>
  <div>
    <div class="reserveslegend"></div>
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
  background-color: #a400db;
}
</style>
