<template>
  <div>
    <h2 class="mb-2">Census Subvision</h2>
    <v-alert
      v-if="classification === 'Not Incorporated'"
      border="right"
      colored-border
      type="error"
      elevation="2"
      class="mt-2"
    >
      Unincorporated municipalities include census data from the entire
      enclosing census subdivision, which may include other communities.
    </v-alert>

    <v-card v-for="(value, key) in groupedCensus" :key="key" class="mb-5">
      <v-card-title class="subheading font-weight-bold">{{
        key === 'null' ? 'Miscellaneous' : key
      }}</v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in value" :key="item.key">
          <v-list-item-content>{{ item.metadata.name }}</v-list-item-content>
          <v-list-item-content class="align-end">{{
            item.value
          }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { groupBy } from 'lodash'

@Component
export default class CensusSubdivision extends Vue {
  @Prop({ default: '', type: String })
  classification

  @Prop({ default: () => {}, type: Object })
  censusSubdivision

  get groupedCensus() {
    if (this.censusSubdivision.groups) {
      return groupBy(this.censusSubdivision.groups, 'group')
    }
    return {}
  }
}
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
