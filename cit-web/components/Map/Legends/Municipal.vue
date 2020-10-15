<template>
  <div>
    <div class="municipal-legend"></div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Municipal extends Vue {}
</script>
<style lang="scss" scoped>
.municipal-legend {
  width: 100px;
  height: 10px;
  background-color: #dadada;
  border-bottom: 1px solid black;
}
</style>
