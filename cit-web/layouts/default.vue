<template>
  <v-app light class="h-100">
    <Navigation></Navigation>
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
import Navigation from '~/components/Navigation.vue'
import Footer from '~/components/Footer.vue'
@Component({
  Footer,
  Navigation,
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
</style>
