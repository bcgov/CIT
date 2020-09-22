<template>
  <v-app light class="h-100">
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <!--
      <v-app-bar-nav-icon
        color="white"
        @click="handleClick"
      ></v-app-bar-nav-icon>
      -->
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
    <div class="fixed-content">
      <nuxt class="h-100" />
    </div>
  </v-app>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
@Component({
  CommSearch,
})
export default class FixedLayout extends Vue {
  mounted() {
    const element = document.documentElement
    element.classList.add('fixed-layout')
  }

  handleClick(e) {
    this.$root.$emit('sidebar-toggle')
  }
}
</script>

<style lang="scss">
.fixed-layout {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
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
</style>
