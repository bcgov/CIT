<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Emergency Risk'"
      :active="active"
      :card-width="380"
      :disabled="disabled"
      @save="handleSave"
      @clear="handleClear"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <h6 class="text-body-1 font-weight-regular">Wildfire Zones</h6>
            <Wildfire ref="wildfire"></Wildfire>
          </v-col>
          <v-col cols="12" sm="6">
            <h6 class="text-body-1 font-weight-regular">Tsunami Zones</h6>
            <Tsunami ref="tsunami"></Tsunami>
          </v-col>
        </v-row>
      </v-container>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
import Wildfire from '~/components/Explore/Filters/Wildfire'
import Tsunami from '~/components/Explore/Filters/Tsunami'
@Component({
  MenuFilter,
  Wildfire,
  Tsunami,
})
export default class EmergencyRisk extends Vue {
  @Prop({ default: false, type: Boolean }) disabled
  title = 'Emergency Risk'
  active = false

  reset() {
    this.title = 'Emergency Risk'
    this.active = false
    this.$nextTick(() => {
      this.$refs.wildfire.reset()
      this.$refs.tsunami.reset()
    })
  }

  handleClear() {
    this.$nextTick(() => {
      this.$refs.wildfire.reset()
      this.$refs.tsunami.reset()
    })
  }

  mounted() {
    console.log(this)
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    const result = this.getParams()
    if (isEmpty(result[0])) {
      this.reset()
    } else {
      this.active = true
    }
    this.$emit('filter')
  }

  getParams() {
    const wildfireParams = this.$refs.wildfire.getParams()
    const tsunamiParams = this.$refs.tsunami.getParams()
    const temp = Object.assign(wildfireParams[0] || {}, tsunamiParams[0] || {})
    return [temp]
  }
}
</script>
