<template>
  <div class="sam-container elevation-5 rounded pt-1 pb-1 pl-2 pr-3">
    <v-checkbox
      v-model="sam"
      dense
      label="Search As I Move"
      hide-details
      class="ma-0 pa-0"
    ></v-checkbox>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
const exploreStore = namespace('explore')
@Component()
export default class Explore extends Vue {
  @exploreStore.Getter('getSearchAsMove') searchAsMove
  @exploreStore.Mutation('updateSearchAsMove') updateSearchAsMove

  get sam() {
    return this.searchAsMove
  }

  set sam(value) {
    this.updateSearchAsMove(value)
  }
}
</script>
<style lang="scss" scoped>
.sam-container {
  background-color: white;
}
</style>
