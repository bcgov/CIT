<template>
  <div>
    <v-card width="300">
      <v-img
        class="white--text align-center"
        width="300px"
        height="50px"
        aspect-ratio="1"
        src="https://cdn.vuetifyjs.com/images/cards/road.jpg"
      >
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-toolbar-title class="title white--text pl-0 text-body-1">
            {{ name }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn color="white" icon class="community-popup-close">
            <v-icon class="community-popup-close-icon">mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
      </v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text
          >View Details
          <v-icon>mdi-right-arrow</v-icon>
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
}
</script>
