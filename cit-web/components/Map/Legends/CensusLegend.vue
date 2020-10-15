<template>
  <div>
    <div class="censuslegend"></div>
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
