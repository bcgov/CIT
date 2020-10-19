<template>
  <div>
    <multiselect
      :value="value"
      class="elevation-5 pa-0 ma-0"
      :options="selections"
      :multiple="false"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="true"
      @input="handleChange"
    >
    </multiselect>
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
