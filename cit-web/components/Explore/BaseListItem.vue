<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn text>View Details</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class BaseListItem extends Vue {
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) subtitle
}
</script>
