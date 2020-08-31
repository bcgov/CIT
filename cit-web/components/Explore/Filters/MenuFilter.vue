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
    <template v-slot:activator="{ on }">
      <v-chip pill outlined v-on="on">
        {{ title }}
      </v-chip>
    </template>
    <v-card width="300">
      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn dense text @click="$emit('clear')">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn dense color="primary" @click="$emit('save')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component()
export default class MenuFilter extends Vue {
  @Prop({ default: null, type: String }) title
  menu = false

  hide() {
    this.menu = false
  }
}
</script>
