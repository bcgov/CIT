<template>
  <v-app light class="h-100">
    <Navigation></Navigation>
    <div class="fixed-content">
      <nuxt class="h-100" />
    </div>
    <div class="fixed-footer">
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
export default class FixedLayout extends Vue {}
</script>
<style lang="scss" scoped>
.fixed-content {
  padding-top: 66px;
  height: 100%;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.h-100 {
  height: 100%;
}
</style>
