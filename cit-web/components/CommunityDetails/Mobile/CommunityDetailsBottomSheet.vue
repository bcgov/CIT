<template>
  <div>
    <v-bottom-sheet
      :value="sheetOpen"
      persistent
      scrollable
      @click.native="handleClick"
    >
      <v-card>
        <div class="mobile-collapse">
          <v-btn color="primary" fab x-small @click="$emit('collapse')">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <v-card-text style="max-height: 75vh;" class="pa-2">
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsBottomSheet extends Vue {
  @Prop({ default: false, type: Boolean }) sheetOpen

  handleClick() {
    console.log('Clicked')
  }
}
</script>
<style lang="scss" scoped>
.mobile-collapse {
  position: absolute;
  top: -40px;
  text-align: center;
  left: 0;
  right: 0;
}
</style>
