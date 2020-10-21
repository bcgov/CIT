<template>
  <div>
    <h2>{{ title }}</h2>
    <h6 class="subtitle-1">
      {{ subtitle }}
    </h6>
    <v-divider class="mt-5"></v-divider>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsSectionHeader extends Vue {
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) subtitle
}
</script>
