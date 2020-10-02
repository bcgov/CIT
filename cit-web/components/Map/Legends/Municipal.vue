<template>
  <div>
    <v-card max-width="190" style="border: 0;" class="elevation-0">
      <v-card-title class="ma-0 pa-0 text-body-1 font-weight-normal"
        >Municipal Boundary</v-card-title
      >
      <v-card-text class="ma-0 pa-0">
        <div class="municipal-legend"></div>
      </v-card-text>
    </v-card>
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
