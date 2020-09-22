<template>
  <v-app light class="h-100">
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <nuxt-link class="main-title d-block" to="/">
        <v-img
          :src="require('~/assets/logo.svg')"
          aspect-ratio="1"
          width="177"
          height="43"
        ></v-img>
      </nuxt-link>
      <v-toolbar-title class="navigation-wrapper">
        <nuxt-link class="main-title d-block font-weight-bold" to="/"
          >Community Information Tool</nuxt-link
        >
      </v-toolbar-title>
      <div style="min-width: 300px;">
        <CommSearch color="white" :solo="true" :dense="true"></CommSearch>
      </div>
    </v-app-bar>
    <div class="content">
      <nuxt />
    </div>
    <div class="footer">
      <v-footer color="primary" height="66">
        <v-btn
          color="primary"
          depressed
          width="225"
          height="40"
          :href="`mailto:${citFeedbackEmail}?subject=CIT Feedback`"
          class="btn feedback-button text-capitalize"
          target="_blank"
          >Give feedback</v-btn
        >
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
@Component({
  CommSearch,
})
export default class DefaultLayout extends Vue {
  citFeedbackEmail = this.$config.citFeedbackEmail
}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  flex-direction: column;
}
.content {
  margin-top: 66px;
  flex: 1 0 auto;
  position: relative;
}
.footer {
  flex-shrink: 0;
}

.v-application .primary.main-navigation {
  border-bottom: 2px solid #fcba19;
  border-color: #fcba19 !important;
}

.navigation-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: unset;
  white-space: normal;
}

.main-title {
  color: white !important;
  text-decoration: none;
}
.feedback-button {
  border: 1px solid white !important;
}
</style>
