<template>
  <div>
    <v-select
      v-model="selected"
      :items="items"
      label="Solo field"
      solo
      @change="$emit('changed', selected)"
    ></v-select>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class CompareSelect extends Vue {
  @Prop({
    default: () => ['All Of BC', 'Regional Districts', 'Communities'],
    type: Array,
  })
  items

  selected = 'All Of BC'
}
</script>
