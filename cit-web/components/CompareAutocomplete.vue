<template>
  <v-autocomplete
    v-model="autocomplete"
    :items="items"
    :item-value="itemValue"
    :item-text="itemText"
    :multiple="multiple"
    @change="handleUpdate"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        {{ data.item[itemText] }}
      </v-chip>
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

  autocomplete = []

  remove(item) {
    const index = this.autocomplete.indexOf(item.id)
    if (index >= 0) this.autocomplete.splice(index, 1)
    this.$emit('change', this.autocomplete)
  }

  handleUpdate() {
    this.$emit('change', this.autocomplete)
  }
}
</script>
