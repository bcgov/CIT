<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Regional Districts'"
      :active="active"
      :card-width="400"
      :disabled="disabled"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-autocomplete
        v-model="autocomplete"
        :items="regionalDistricts"
        item-text="name"
        item-value="id"
        placeholder="Select a Regional District"
        label="Regional District"
        return-object
        hide-details
      ></v-autocomplete>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
const commModule = namespace('communities')
@Component
export default class RegionalDistricts extends Vue {
  @Prop({ default: false, type: Boolean }) disabled
  title = 'Regional Districts'
  active = false
  autocomplete = null
  @commModule.Getter('getRegionalDistricts') regionalDistricts

  reset() {
    this.active = false
    this.title = 'Regional Districts'
    this.autocomplete = null
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    if (!this.autocomplete) {
      this.reset()
    } else {
      this.active = true
      this.title = this.autocomplete.name
      this.$root.$emit('regionSelected')
    }
    this.$emit('filter')
  }

  handleClear() {
    this.autocomplete = null
  }

  mounted() {
    this.$root.$on('setRegion', (rid) => {
      const region = this.regionalDistricts.find((r) => r.id === parseInt(rid))
      this.autocomplete = region || null
      this.handleSave()
    })
  }

  getParams() {
    return this.autocomplete === null
      ? []
      : [{ regional_district: this.autocomplete.id }]
  }
}
</script>
