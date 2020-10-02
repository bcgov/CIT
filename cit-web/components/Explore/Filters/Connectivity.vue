<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Internet'"
      :active="active"
      :card-width="600"
      :disabled="disabled"
      @save="handleSave"
      @clear="handleClear"
    >
      <ConnectivityInputs ref="connectivityInput"></ConnectivityInputs>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
import ConnectivityInputs from '~/components/Explore/Filters/ConnectivityInputs'
@Component({
  MenuFilter,
  ConnectivityInputs,
})
export default class Connectivity extends Vue {
  @Prop({ default: false, type: Boolean }) disabled

  radioGroup = null
  title = 'Internet'
  active = false

  reset() {
    this.radioGroup = null
    this.title = 'Internet'
    this.active = false
    this.$refs.connectivityInput?.reset()
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    if (!this.$refs.connectivityInput.isValid) {
      this.title = 'Internet'
      this.active = false
    } else {
      this.title = this.$refs.connectivityInput.getText()
      this.active = true
    }
    this.$emit('filter')
  }

  handleClear() {
    this.$refs.connectivityInput.handleClear()
  }

  getParams() {
    if (!this.$refs.connectivityInput) {
      return []
    }
    return this.$refs.connectivityInput.getParams()
  }
}
</script>
