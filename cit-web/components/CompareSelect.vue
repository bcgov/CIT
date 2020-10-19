<template>
  <div>
    <v-select
      :items="selections"
      :value="value"
      solo
      hide-details
      @change="handleChange"
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

  @compareStore.Mutation('setCompareMode')
  setCompareMode

  handleChange(data) {
    this.setCompareMode(data)
    this.$emit('changed', data)
  }

  mounted() {
    this.setCompareMode(this.value)
  }
}
</script>
