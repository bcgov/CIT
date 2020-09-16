<template>
  <div>
    <v-menu
      v-model="menu"
      class="pa-0 ma-0 rounded"
      top
      left
      transition="fade-transition"
      :close-on-content-click="false"
      :nudge-top="5"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          fab
          class="rounded-lg text-capitalize"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-map</v-icon>
        </v-btn>
      </template>
      <v-card width="300" class="rounded-lg pa-0 ma-0">
        <v-toolbar color="primary" height="48">
          <v-toolbar-title class="white--text font-weight-bold text-body-1"
            ><v-icon color="white">mdi-map</v-icon> Layers</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text>
          <div
            v-for="(layer, index) in layers"
            :key="index"
            class="d-flex align-center"
            :class="{ 'mt-3': index !== 0 }"
          >
            <label :for="layer.layerLabel">{{ layer.layerLabel }}</label>
            <v-spacer></v-spacer>
            <v-switch
              :id="layer.layerLabel"
              class="ma-0 pa-0"
              hide-details
              @change="handleChange($event, layer.layerName)"
            >
              <template v-slot:prepend></template>
            </v-switch>
          </div>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LayerSwitcher extends Vue {
  @Prop({ default: null, type: Array }) layers
  menu = false

  handleChange(e, data) {
    this.$emit('layerToggle', {
      visibility: e,
      layerName: data,
    })
  }
}
</script>
