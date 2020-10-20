<template>
  <div>
    <v-bottom-sheet :value="sheetOpen">
      <v-sheet height="90vh">
        Sheet Test
        <slot></slot>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsBottomSheet extends Vue {
  @Prop({ default: false, type: Boolean }) sheetOpen
}
</script>
