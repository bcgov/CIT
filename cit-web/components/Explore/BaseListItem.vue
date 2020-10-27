<template>
  <v-list-item class="pa-0 pl-5 pr-5 base-list-item">
    <v-list-item-content>
      <v-list-item-title>
        <a style="color: #2176d2;" @click.prevent="handleMoreDetails">{{
          title
        }}</a>
      </v-list-item-title>
      <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="my-0 py-0">
      <div>
        <v-tooltip v-if="findOnMap" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              width="26"
              height="26"
              dark
              color="#2176d2"
              class="mr-2 elevation-0"
              v-bind="attrs"
              @click="$root.$emit('recenterMap', center)"
              v-on="on"
            >
              <v-icon small>mdi-map-marker-radius</v-icon>
            </v-btn>
          </template>
          <span>Locate On Map</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="elevation-0"
              width="26"
              height="26"
              fab
              dark
              color="#2176d2"
              v-bind="attrs"
              @click="handleMoreDetails"
              v-on="on"
            >
              <v-icon small>mdi-arrow-right-box</v-icon>
            </v-btn>
          </template>
          <span>Go To Details Page</span>
        </v-tooltip>
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
  @Prop({ default: null, type: Array }) center

  get findOnMap() {
    return this.$route.query?.tab === 'Map' || !this.$route.query.tab
  }

  handleMoreDetails() {
    window.open(`/community/${this.cid}`)
  }
}
</script>
<style lang="scss" scoped>
.base-list-item {
  min-height: auto !important;
}
</style>
