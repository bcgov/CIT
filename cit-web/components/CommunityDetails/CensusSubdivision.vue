<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Raw Census Data (in above charts)
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-col
            v-for="(value, key) in groupedCensus"
            :key="key"
            class="mb-5"
            cols="12"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{
                key === 'null' ? 'Miscellaneous' : key
              }}</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item v-for="item in value" :key="item.key">
                  <v-list-item-content>{{
                    item.metadata.name
                  }}</v-list-item-content>
                  <v-list-item-content class="align-end justify-center"
                    >{{ item.value || 'No data'
                    }}{{ item.value ? item.units : '' }}</v-list-item-content
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'

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
