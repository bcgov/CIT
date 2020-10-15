<template>
  <div>
    <div class="d-flex align-center">
      <div class="risk risk-1"></div>
      <div class="risk risk-2"></div>
      <div class="risk risk-3"></div>
      <div class="risk risk-4"></div>
      <div class="risk risk-5"></div>
    </div>
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
  width: 20px;
  height: 20px;
  border-radius: 9999px;
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
