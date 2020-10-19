<template>
  <div>
    <div class="d-flex align-center">
      <div class="legend-icon" style="background-color: #005233;"></div>
      <div class="legend-icon" style="background-color: #6a03b6;"></div>
      <div class="legend-icon" style="background-color: #ed5b4c;"></div>
      <div class="legend-icon" style="background-color: #fde293;"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'InternetSpeed',
})
export default class w extends Vue {}
</script>
<style lang="scss" scoped>
.legend-icon {
  height: 10px;
  width: 25px;
}
</style>
