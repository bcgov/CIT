<template>
  <div>
    Items: {{ selections }}
    <v-select
      v-model="selected"
      :items="selections"
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
  @Prop()
  selections

  @Prop()
  value

  selected = null
  @compareStore.Mutation('setCompareMode')
  setCompareMode

  updated() {
    this.setCompareMode(this.selected)
  }

  mounted() {
    this.$emit('changed', this.selected)
    this.setCompareMode(this.selected)
  }
}
</script>
