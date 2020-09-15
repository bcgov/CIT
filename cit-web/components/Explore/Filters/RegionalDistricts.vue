<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Regional Districts'"
      :active="active"
      :card-width="400"
      @save="handleSave"
      @clear="autocomplete = null"
    >
      <v-autocomplete
        v-model="autocomplete"
        :items="regionalDistricts"
        item-text="name"
        item-value="id"
        placeholder="Metro Vancouver Regional District"
        label="Regional District"
        return-object
        hide-details
      ></v-autocomplete>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
const commModule = namespace('communities')
@Component
export default class RegionalDistricts extends Vue {
  title = 'Regional Districts'
  active = false
  autocomplete = null
  @commModule.Getter('getRegionalDistricts') regionalDistricts

  handleSave() {
    this.$refs.menuFilter.hide()
    if (!this.autocomplete) {
      this.reset()
    } else {
      this.active = true
      this.title = this.autocomplete.name
    }
    this.$emit('filter')
  }

  reset() {
    this.active = false
    this.title = 'Regional Districts'
  }

  getParams() {
    return this.autocomplete === null
      ? []
      : [{ regional_district: this.autocomplete.id }]
  }
}
</script>
