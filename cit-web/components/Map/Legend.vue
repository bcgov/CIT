<template>
  <div>
    <v-menu
      :key="counter"
      v-model="menu"
      class="pa-0 ma-0 rounded"
      top
      right
      transition="fade-transition"
      :close-on-content-click="false"
      :close-on-click="false"
      :nudge-top="10"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          ref="menuButton"
          color="primary"
          small
          fab
          class="rounded-lg text-capitalize"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-map-legend</v-icon>
        </v-btn>
      </template>

      <v-card width="300" class="rounded-lg pa-0 ma-0">
        <v-toolbar color="primary" height="48">
          <v-toolbar-title class="white--text font-weight-bold text-body-1"
            ><v-icon color="white">mdi-map-legend</v-icon>
            Legend</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text class="mt-0 pt-0">
          <v-select
            v-model="select"
            :items="legends"
            class="mb-2 mt-0"
            item-value="component"
            item-text="title"
            hide-details
          ></v-select>
          <component :is="legend"></component>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({})
export default class LayerSwitcher extends Vue {
  menu = false
  select = 'InternetSpeed'

  counter = 0
  @Watch('select')
  handleSelectChange() {
    this.$refs.menuButton.$el.click()
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.menuButton.$el.click()
      }, 100)
    })
  }

  get legend() {
    const componentName = this.select
    return () => import(`~/components/Map/Legends/${componentName}`)
  }

  legends = [
    {
      title: 'Internet Speeds',
      component: 'InternetSpeed',
    },
    {
      title: 'Municipal Boundary',
      component: 'Municipal',
    },
  ]
}
</script>
