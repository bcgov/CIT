<template>
  <v-autocomplete
    v-model="autocomplete"
    :items="items"
    :item-value="itemValue"
    :item-text="itemText"
    :multiple="multiple"
    hide-details
    solo
    :search-input.sync="searchInput"
    @change="handleUpdate"
    @keyup.enter="handleEnter"
  >
    <template v-slot:selection="data">
      <div v-if="autocomplete.length > 1">
        <v-chip @click="data.select">
          {{ autocomplete.length }} {{ mode }} selected
        </v-chip>
      </div>
      <div v-else>
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item[itemText] }}
        </v-chip>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component({})
export default class Compare extends Vue {
  @Prop({ default: null, type: Array }) items
  @Prop({ default: 'id', type: String }) itemValue
  @Prop({ default: 'value', type: String }) itemText
  @Prop({ default: true, type: Boolean }) multiple
  @Prop({ default: true, type: String }) mode

  autocomplete = []
  searchInput = ''
  groupChips = false

  setGroupChips(state) {
    this.groupChips = state
  }

  remove(item) {
    const index = this.autocomplete.indexOf(item.id)
    if (index >= 0) this.autocomplete.splice(index, 1)
    this.$emit('change', this.autocomplete)
  }

  handleUpdate() {
    this.$emit('change', this.autocomplete)
  }

  handleEnter(e) {
    this.searchInput = ''
  }

  setAutoComplete(data) {
    this.autocomplete = data
    this.$emit('change', this.autocomplete)
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
</style>
