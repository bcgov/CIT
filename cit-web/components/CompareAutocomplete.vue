<template>
  <div>
    <multiselect
      :value="value"
      class="elevation-5"
      :options="items"
      :multiple="true"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="true"
      :label="itemText"
      :track-by="itemValue"
      :limit="1"
      @input="handleUpdate"
    >
    </multiselect>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component({})
export default class Compare extends Vue {
  @Prop({ default: null, type: Array }) items
  @Prop({ default: 'id', type: String }) itemValue
  @Prop({ default: 'value', type: String }) itemText
  @Prop({ default: true, type: Boolean }) multiple
  @Prop() value

  groupChips = false
  isHydrated = false

  mounted() {
    this.isHydrated = true
  }

  handleUpdate(data) {
    this.$emit('update', data)
  }
}
</script>
<style lang="scss" scoped>
.v-select__selections div {
  display: none !important;
}
.v-select__selections div:first-child {
  display: inline-block !important;
}
.v-list .v-list-item--active {
  color: black !important;
}
</style>
<style lang="scss">
.multiselect__content {
  padding-left: 0 !important;
}
</style>
