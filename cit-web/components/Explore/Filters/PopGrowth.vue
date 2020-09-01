<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Population Growth'"
      :active="active"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-radio-group v-model="radioGroup" hide-details dense>
        <v-radio
          v-for="(type, index) in populationTypes"
          :key="index"
          :label="type.title"
        ></v-radio>
      </v-radio-group>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
@Component({
  MenuFilter,
})
export default class PopGrowth extends Vue {
  radioGroup = null
  title = 'Population Growth'
  active = false
  populationTypes = [
    {
      title: 'Shrinking',
    },
    {
      title: 'No Change',
    },
    {
      title: 'Growing (<25%)',
    },
    {
      title: 'Rapid Growth (>25%)',
    },
  ]

  queries = [
    {
      population_percentage_change__lt: 0,
    },
    {
      population_percentage_change__lte: 0,
      population_percentage_change__gte: 0,
    },
    {
      population_percentage_change__lte: 0.25,
      population_percentage_change__gt: 0,
    },
    {
      population_percentage_change__gt: 0.25,
    },
  ]

  handleSave() {
    this.$refs.menuFilter.hide()
    const index = this.radioGroup
    if (index === null) {
      this.title = 'Population Growth'
      this.active = false
    } else {
      this.title = this.populationTypes[index].title
      this.active = true
    }
    this.$emit('filter')
  }

  handleClear() {
    this.radioGroup = null
  }

  getParams() {
    const index = this.radioGroup
    return index === null ? [] : [this.queries[index]]
  }
}
</script>
