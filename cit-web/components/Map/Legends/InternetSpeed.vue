<template>
  <div>
    <div class="d-flex align-center">
      <div>
        <div class="legend-icon" style="background-color: #005233;"></div>
        <div class="caption text-center">50</div>
      </div>
      <div>
        <div class="legend-icon" style="background-color: #6a03b6;"></div>
        <div class="caption text-center">25</div>
      </div>
      <div>
        <div class="legend-icon" style="background-color: #ed5b4c;"></div>
        <div class="caption text-center">10</div>
      </div>
      <div>
        <div class="legend-icon" style="background-color: #fde293;"></div>
        <div class="caption text-center">5</div>
      </div>
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
  height: 5px;
  width: 25px;
}
</style>
