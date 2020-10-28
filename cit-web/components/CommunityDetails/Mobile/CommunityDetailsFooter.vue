<template>
  <div>
    <v-app-bar
      fixed
      bottom
      height="40"
      color="primary"
      class="elevation-5 cd-app-bar"
      @click="$emit('openSheet', true)"
    >
      <v-toolbar-title class="text-body-1 white--text">{{
        placeName
      }}</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn icon fab>
        <v-icon color="white">mdi-chevron-up</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommuntityDetailsFooter extends Vue {
  @Prop({ default: null, type: String }) placeName
}
</script>
<style lang="scss" scoped>
.cd-app-bar {
  bottom: 46px;
}

@media screen and (max-width: 540px) {
  .cd-app-bar {
    bottom: 62px;
  }
}
</style>
