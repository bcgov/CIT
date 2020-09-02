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
      <v-chip pill outlined :input-value="active" filter v-on="on">
        {{ chipTitle }}
      </v-chip>
    </template>
    <v-card :width="cardWidth">
      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ filterTitle }}</v-list-item-title>
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
  @Prop({ default: null, type: String }) filterTitle
  @Prop({ default: null, type: String }) chipTitle
  @Prop({ default: false, type: Boolean }) active
  @Prop({ default: 300, type: Number }) cardWidth

  menu = false

  hide() {
    this.menu = false
  }
}
</script>
