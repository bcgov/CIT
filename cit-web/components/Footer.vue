<template>
  <v-footer class="footer" color="primary" :height="footerHeight">
    <ul style="list-style: none;" class="d-flex ma-0 pa-0 footer-list">
      <li
        v-for="(fi, index) in footerItems"
        :key="index"
        class="pa-0 ma-0 mx-2"
        style="min-height: auto;"
      >
        <a :href="fi.href" class="white--text text-decoration-none">{{
          fi.title
        }}</a>
      </li>
    </ul>
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

  get footerHeight() {
    return this.$vuetify.breakpoint.width < 540 ? 'auto' : 46
  }

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

.footer-list {
  flex-wrap: wrap;
}
</style>
