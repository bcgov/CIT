<template>
  <div>
    <v-menu
      v-model="menu"
      bottom
      center
      transition="scale-transition"
      origin="top"
      :close-on-content-click="false"
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
