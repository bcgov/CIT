<template>
  <div>
    <v-menu
      v-model="menu"
      class="pa-0 ma-0 rounded"
      top
      left
      transition="fade-transition"
      :close-on-content-click="false"
      max-height="500"
      allow-overflow
    >
      <template v-slot:activator="{ on, attrs }">
        <v-tooltip left>
          <template v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }">
            <v-btn
              color="primary"
              x-small
              fab
              class="rounded-lg text-capitalize layerSwitcherButton"
              v-bind="{ ...attrs, ...attrsTooltip }"
              v-on="{ ...on, ...onTooltip }"
            >
              <v-icon>mdi-layers</v-icon>
            </v-btn>
          </template>
          Layers & Legends
        </v-tooltip>
      </template>
      <v-card width="400" class="rounded-lg pa-0 ma-0">
        <v-toolbar color="primary" height="48">
          <v-toolbar-title class="white--text font-weight-bold text-body-1"
            ><v-icon color="white">mdi-layers</v-icon> Layers &
            Legends</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn x-small icon fab color="white" @click="menu = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <div
            v-for="(layer, index) in layers"
            :key="index"
            class="d-flex align-center"
            :class="{ 'mt-3': index !== 0 }"
          >
            <DynamicLegend
              :component-name="layer.legendComponent"
              class="mr-2"
            ></DynamicLegend>
            <label :for="layer.layerLabel">{{ layer.layerLabel }}</label>
            <span v-if="layer.layerName === 'bc-roads'">
              <v-tooltip bottom color="primary" class="rounded-lg">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small fab icon v-bind="attrs" v-on="on">
                    <v-icon color="primary">mdi-information</v-icon>
                  </v-btn>
                </template>
                Speeds indicate download/upload speed in mbps.
              </v-tooltip>
            </span>

            <v-spacer></v-spacer>
            <v-switch
              :id="layer.layerLabel"
              class="ma-0 pa-0"
              hide-details
              :input-value="layer.on"
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

  mounted() {
    setTimeout(() => {
      this.menu = true
    }, 1000)
  }
}
</script>
<style>
div[role='menu'].v-menu__content {
  z-index: 8 !important;
}
</style>
