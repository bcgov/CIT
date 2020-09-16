<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Internet'"
      :active="active"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-radio-group v-model="radioGroup" hide-details dense class="mt-0">
        <v-radio
          v-for="(type, index) in internetSpeeds"
          :key="index"
          :label="type"
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
  title = 'Internet'
  active = false

  internetSpeeds = [
    '50/10 75+ % Availability',
    '25/5 75+ % Availability',
    '10/2 75+ % Availability',
    '5/1 75+ % Availability',
  ]

  queries = [
    {
      percent_50_10__gte: 0.75,
    },
    {
      percent_25_5__gte: 0.75,
    },
    {
      percent_10_2__gte: 0.75,
    },
    {
      percent_5_1__gte: 0.75,
    },
  ]

  handleSave() {
    this.$refs.menuFilter.hide()
    const index = this.radioGroup
    if (index === null) {
      this.title = 'Internet'
      this.active = false
    } else {
      this.title = this.internetSpeeds[index]
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
