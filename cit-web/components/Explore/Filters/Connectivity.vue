<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Internet'"
      :active="active"
      :card-width="600"
      @save="handleSave"
      @clear="handleClear"
    >
      <ConnectivityInputs ref="connectivityInput"></ConnectivityInputs>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
import ConnectivityInputs from '~/components/Explore/Filters/ConnectivityInputs'
@Component({
  MenuFilter,
  ConnectivityInputs,
})
export default class PopGrowth extends Vue {
  radioGroup = null
  title = 'Internet'
  active = false

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
