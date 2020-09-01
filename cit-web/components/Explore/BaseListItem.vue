<template>
  <v-list-item class="pa-0">
    <v-list-item-content>
      <v-list-item-title v-text="title"></v-list-item-title>
      <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <div>
        <v-btn icon fab small dark color="primary" class="mr-2">
          <v-icon>mdi-map-marker-radius</v-icon>
        </v-btn>
        <v-btn icon fab small dark color="primary" @click="handleMoreDetails">
          <v-icon>mdi-arrow-right-box</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class BaseListItem extends Vue {
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) subtitle
  @Prop({ default: null, type: Number }) cid

  handleMoreDetails() {
    window.open(`/community/${this.cid}`)
  }
}
</script>
