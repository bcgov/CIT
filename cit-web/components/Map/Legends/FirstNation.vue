<template>
  <div>
    <div class="d-flex align-center first-nation-legend"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FirstNation extends Vue {}
</script>
<style lang="scss" scoped>
.first-nation-legend {
  width: 100px;
  height: 5px;
  background-color: #ff47bf;
}
</style>
