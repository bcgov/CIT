<template>
  <div>
    <v-card width="300" class="rounded-lg">
      <v-app-bar flat color="rgb(33, 118, 210)" height="50">
        <v-toolbar-title class="title white--text pl-0 text-body-1">
          {{ name }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn x-small icon fab color="white" class="community-popup-close">
          <v-icon class="community-popup-close-icon">mdi-close-circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text class="ma-0 pa-2"
        >Population: {{ population || 'N/A' }}</v-card-text
      >
      <v-card-actions class="ma-0 pa-2">
        <v-btn
          class="text-capitalize"
          block
          color="primary"
          :href="`/community/${cid}`"
          target="_blank"
          >View Details
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityPopup extends Vue {
  @Prop({ default: null, type: String }) name
  @Prop({ default: null, type: String }) cid
  @Prop({ default: null, type: Number }) population
}
</script>
