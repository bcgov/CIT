<template>
  <div class="d-inline-block">
    <v-menu
      v-model="menu"
      class="pa-0 ma-0"
      bottom
      transition="scale-transition"
      :close-on-content-click="false"
      offset-y
      nudge-bottom="5"
    >
      <template v-slot:activator="{ on }">
        <v-chip pill outlined v-on="on">
          {{ title }}
        </v-chip>
      </template>
      <v-card width="300">
        <v-list dark>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Community Type</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <div><v-switch class="ma-2" label="Indigenous"></v-switch></div>
              <div>
                <v-switch class="ma-2" label="Rural"></v-switch>
              </div>
              <div><v-switch class="ma-2" label="Urban"></v-switch></div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component()
export default class Explore extends Vue {
  @Prop({ default: null, type: String }) title
  menu = false
}
</script>
