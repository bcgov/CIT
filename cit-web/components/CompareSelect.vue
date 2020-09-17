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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class CompareSelect extends Vue {
  @Prop({
    default: () => [
      'Average Of BC',
      'Average Of Regional Districts',
      'Communities',
    ],
    type: Array,
  })
  items

  selected = 'Average Of BC'

  setSelected(mode) {
    this.selected = mode
    this.$emit('changed', this.selected)
  }

  mounted() {
    this.$emit('changed', this.selected)
  }
}
</script>
