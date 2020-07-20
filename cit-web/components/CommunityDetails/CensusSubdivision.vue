<template>
  <v-card>
    <v-card-title class="subheading font-weight-bold"
      >Census Subvision</v-card-title
    >
    <v-alert
      v-if="classification === 'Not Incorporated'"
      border="right"
      colored-border
      type="error"
      elevation="2"
      class="ma-4 mt-0"
    >
      Unincorporated municipalities include census data from the entire
      enclosing census subdivision, which may include other communities.
    </v-alert>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="(value, key) in censusSubdivision" :key="key">
        <v-list-item-content>{{ key }}</v-list-item-content>
        <v-list-item-content class="align-end">{{ value }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component({})
export default class MyComponent extends Vue {
  @Prop({ default: '', type: String })
  classification

  @Prop({ default: () => {}, type: Object })
  censusSubdivision
  /*
  get groupedCensus() {
    const gc = {
      'Population, 2016': [],
      'Population percentage change, 2011 to 2016': [],
      'Total private dwellings': [],
      'Land area in square kilometres': [],
      'Age Of Population': [],
      'Types Of Occupied Dwellings': [],
      'Marital Status': [],
      English: [],
      'Non-official Languages': [],
      'Aboriginal Languages': [],
      'Neither English nor French': [],
      Income: [],
      'Immigration and Citizenship': [],
      'Visible Minority': [],
      Education: [],
      Employment: [],
    }

    const keyGroup = {
      population: 'Population, 2016',
      popluation_percentage_change:
        'Population percentage change, 2011 to 2016',
      priv_dwel: 'Total private dwellings',
      area: 'Land area in square kilometres',
      pop_pct_0_14: 'Age Of Population',
      pop_pct_14_65: 'Age Of Population',
      pop_pct_65: 'Age Of Population',
      detached_houses: 'Types Of Occupied Dwellings',
      apartments: 'Types Of Occupied Dwellings',
      other_attached_dwellings: 'Types Of Occupied Dwellings',
      movable_dwellings: 'Types Of Occupied Dwellings',
      married_or_common_law: 'Marital Status',
      couples_with_children: 'Marital Status',
      single_parents: 'Marital Status',
      eng_known: 'English',
      other_lang: 'Non-official Languages',
      aboriginal_lang: 'Aboriginal Languages',
      eng_fr_not_known: 'Neither English nor French',
      median_total_income: 'Median total income in 2015 among recipients ($)',
    }
    for (const key in this.censusSubdivision) {
    }
    
  } */
}
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
