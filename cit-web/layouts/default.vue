<template>
  <v-app light class="h-100">
    <Navigation></Navigation>
    <div :class="{ content: !fixed, 'fixed-content': fixed }">
      <div v-if="legacy">
        <v-alert type="error">{{ message }}</v-alert>
      </div>
      <nuxt />
    </div>
    <div :class="{ footer: !fixed, 'fixed-footer': fixed }">
      <Footer></Footer>
    </div>
  </v-app>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import Navigation from '~/components/Navigation.vue'
import Footer from '~/components/Footer.vue'
const appStore = namespace('app')
@Component({
  Footer,
  Navigation,
})
export default class DefaultLayout extends Vue {
  @appStore.Getter('getFixed') fixed

  get legacy() {
    return this.$store.state.legacy
  }

  get message() {
    return this.$store.state.message
  }
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
