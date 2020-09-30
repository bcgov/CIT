<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Power Access'"
      :active="active"
      :card-width="350"
      :disabled="disabled"
      @save="handleSave"
      @clear="handleClear"
    >
      <p>
        Search by the nearest distance of power substation access. Choose
        between a minimum and a maximum inclusive.
      </p>
      <p class="text-center ma-0 pa-0">
        {{ range[0] }} km to {{ range[1] }} km
      </p>
      <v-range-slider
        v-model="range"
        :max="max"
        :min="min"
        hide-details
        class="align-center mt-1"
      ></v-range-slider>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MenuFilter from '~/components/Explore/Filters/MenuFilter'
@Component({
  MenuFilter,
})
export default class PowerAccess extends Vue {
  @Prop({ default: false, type: Boolean }) disabled

  title = 'Power Access'
  active = false

  min = 0
  max = 100
  range = [this.min, this.max]

  reset() {
    this.title = 'Power Access'
    this.active = false
    this.range = [this.min, this.max]
  }

  get isDefaultRange() {
    return this.range[0] === this.min && this.range[1] === this.max
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    if (this.isDefaultRange) {
      this.active = false
      this.title = 'Power Access'
    } else {
      this.title = `Power Access ${this.range[0]}-${this.range[1]} km`
      this.active = true
    }
    this.$emit('filter')
  }

  handleClear() {
    this.range = [this.min, this.max]
  }

  getParams() {
    return this.isDefaultRange === true
      ? []
      : [
          { nearest_substation_distance__gte: this.range[0] },
          { nearest_substation_distance__lte: this.range[1] },
        ]
  }
}
</script>
