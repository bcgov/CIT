<template>
  <v-menu
    v-model="menu"
    class="pa-0 ma-0 rounded"
    bottom
    transition="scale-transition"
    :close-on-content-click="false"
    offset-y
    nudge-bottom="5"
    eager
  >
    <template v-slot:activator="{ on }">
      <v-chip
        pill
        outlined
        :input-value="active"
        filter
        :disabled="disabled"
        class="text-body-1 filter-menu-chips px-2"
        v-on="on"
      >
        {{ chipTitle }}
        <v-icon v-if="menu" small>mdi-chevron-up</v-icon>
        <v-icon v-else small>mdi-chevron-down</v-icon>
      </v-chip>
    </template>
    <v-card :width="cardWidth" class="rounded-lg">
      <v-list color="primary" class="pa-0 ma-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="white--text font-weight-bold d-flex justify-space-between align-center"
              >{{ filterTitle }}
              <v-btn x-small icon fab color="white" @click="menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-text style="max-height: 300px; overflow-y: auto;">
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          dense
          text
          class="text-body-1 font-weight-medium text-capitalize"
          @click="$emit('clear')"
          >Clear</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          dense
          color="primary"
          class="text-body-1 font-weight-medium text-capitalize"
          @click="$emit('save')"
          >Save</v-btn
        >
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
  @Prop({ default: false, type: Boolean }) disabled

  menu = false

  hide() {
    this.menu = false
  }

  isHydrated = false

  get isMobile() {
    if (this.isHydrated) {
      return this.$vuetify.breakpoint.width < 600
    } else {
      return false
    }
  }

  mounted() {
    this.isHydrated = true
  }
}
</script>
<style lang="scss" scoped>
.filter-menu-chips {
  border-radius: 6px !important;
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
