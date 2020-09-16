<template>
  <v-toolbar :height="height">
    <v-breadcrumbs :items="breadcrumbs" class="pa-0 ma-0"></v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-tabs :value="tab" style="max-width: 200px;" right @change="handleChange">
      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Explore extends Vue {
  @Prop({ default: '50', type: String }) height
  @Prop({ default: 'Map', type: String }) activeTab
  @Prop({ default: null, type: Array }) breadcrumbs

  get tab() {
    return parseInt(this.tabs.findIndex((t) => t === this.activeTab))
  }

  tabs = ['Map', 'Reports']

  handleChange(data) {
    this.$emit('tabChange', this.tabs[data])
  }
}
</script>
