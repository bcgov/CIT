<template>
  <v-footer class="footer" color="primary" height="46">
    <v-list class="d-flex ma-0 pa-0" color="primary">
      <v-list-item
        v-for="(fi, index) in footerItems"
        :key="index"
        class="pa-0 ma-0"
        :href="fi.href"
        style="min-height: auto;"
      >
        <v-list-item-title class="ma-0 pa-0 px-4 white--text text-body-2">{{
          fi.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-footer>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
@Component({
  CommSearch,
})
export default class Footer extends Vue {
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
.footer {
  flex-shrink: 0;
  border-top: 2px solid #fcba19;
  border-color: #fcba19 !important;
}
</style>
