<template>
  <div>
    <v-select
      v-model="selected"
      :items="items"
      label="Solo field"
      solo
      hide-details
      @change="$emit('changed', selected)"
    ></v-select>
  </div>
</template>

<script>
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
const compareStore = namespace('compare')
@Component
export default class CompareSelect extends Vue {
  @Prop({
    default: () => [
      'Average Of BC',
      'Average Of Regional Districts',
      'Average Of Communities',
    ],
    type: Array,
  })
  items

  @compareStore.Mutation('setCompareMode')
  setCompareMode

  selected = 'Average Of BC'

  setSelected(mode) {
    this.selected = mode
    this.$emit('changed', this.selected)
    this.setCompareMode(this.selected)
  }

  updated() {
    this.setCompareMode(this.selected)
  }

  mounted() {
    this.$emit('changed', this.selected)
    this.setCompareMode(this.selected)
  }
}
</script>
