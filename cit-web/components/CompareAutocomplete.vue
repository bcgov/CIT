<template>
  <div>
    <multiselect
      v-model="autocomplete"
      class="elevation-5"
      :options="items"
      :multiple="true"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="true"
      :label="itemText"
      :track-by="itemValue"
      @input="handleUpdate"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }"
        ><span
          v-if="values.length &amp;&amp; !isOpen"
          class="multiselect__single"
          >{{ values.length }} options selected</span
        ></template
      >
    </multiselect>
  </div>
</template>

<script>
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
const compareStore = namespace('compare')
@Component({})
export default class Compare extends Vue {
  @Prop({ default: null, type: Array }) items
  @Prop({ default: 'id', type: String }) itemValue
  @Prop({ default: 'value', type: String }) itemText
  @Prop({ default: true, type: Boolean }) multiple
  @Prop value
  @compareStore.Mutation('setCompare') setCompare

  autocomplete = []
  groupChips = false
  isHydrated = false

  mounted() {
    this.isHydrated = true
  }

  handleUpdate() {
    this.$emit('change', this.autocomplete)
    console.log('Autocomplete', this.autocomplete)
    this.setCompare(this.getSelectedNames())
  }

  getSelectedNames() {
    const temp = []
    this.autocomplete.map((ac) => {
      const tempItem = this.items.find((i) => i[this.itemValue] === ac)
      temp.push(tempItem?.[this.itemText])
    })
    console.log('Selected Names', temp)
    return temp
  }

  clear() {
    this.autocomplete = []
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
