<template>
  <v-btn color="primary rounded-lg white--text" small>
    <v-checkbox
      v-model="sam"
      dense
      label="Search As I Move"
      hide-details
      class="ma-0 pa-0 text-capitalize white--text sam-checkbox"
      color="white"
    >
      <template v-slot:label>
        <span class="white--text pr-1">Search As I Move</span>
      </template>
    </v-checkbox>
  </v-btn>
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
.sam-checkbox .theme--light.v-label {
  color: white !important;
}
</style>
