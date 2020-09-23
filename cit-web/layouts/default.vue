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
      <Footer></Footer>
    </div>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
import Footer from '~/components/Footer.vue'
@Component({
  CommSearch,
  Footer,
})
export default class DefaultLayout extends Vue {
  citFeedbackEmail = this.$config.citFeedbackEmail

  footerItems = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Disclaimer',
      href: 'https://www2.gov.bc.ca/gov/content/home/disclaimer',
    },
    {
      title: 'Privacy',
      href: 'https://www2.gov.bc.ca/gov/content/home/privacy',
    },
    {
      title: 'Accessibility',
      href: 'https://www2.gov.bc.ca/gov/content/home/accessibility',
    },
    {
      title: 'Copyright',
      href: 'https://www2.gov.bc.ca/gov/content/home/copyright',
    },
    {
      title: 'Contact Us',
      href: `mailto:${this.$config.citFeedbackEmail}?subject=CIT Feedback`,
    },
  ]
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
