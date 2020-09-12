<template>
  <div>
    <v-menu
      v-model="menu"
      class="pa-0 ma-0 rounded"
      bottom
      transition="scale-transition"
      :close-on-content-click="false"
      offset-y
      nudge-bottom="5"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">Layers</v-btn>
      </template>
      <v-card width="300" class="rounded-lg">
        <v-toolbar color="primary">
          <v-toolbar-title class="white--text">Layers</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div
            v-for="(layer, index) in layers"
            :key="index"
            class="d-flex align-center"
          >
            <label :for="layer.layerName">{{ layer.layerLabel }}</label>
            <v-spacer></v-spacer>
            <v-switch
              :id="layer.layerName"
              v-model="layerSwitch"
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
  layerSwitch = false

  handleChange(e, data) {
    this.$emit('layerToggle', {
      visibility: e,
      layerName: data,
    })
  }
}
</script>
