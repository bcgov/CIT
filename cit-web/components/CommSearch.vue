<template>
  <div>
    <v-autocomplete
      :items="communities"
      item-value="id"
      item-text="place_name"
      label="Community Name"
      append-icon="mdi-map-search"
      @input="handleClick"
    ></v-autocomplete>
  </div>
</template>

<script>
import { Vue, Prop, Component } from 'nuxt-property-decorator'
@Component
export default class CommSearch extends Vue {
  @Prop({ default: () => [], type: Array })
  communities

  handleClick(cid) {
    window.open(`/community/${cid}`)
  }
}
</script>
