<template>
  <div>
    <div class="d-flex align-center regionalLegend"></div>
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
