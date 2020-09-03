<template>
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
      <v-btn v-bind="attrs" filter v-on="on">
        Layers
      </v-btn>
    </template>
    <v-card :width="cardWidth">
      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Layers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-text>
        Switches should go here
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LayerSwitcher extends Vue {
  menu = false
}
</script>
