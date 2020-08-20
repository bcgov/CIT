<template>
  <v-app light class="h-100">
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <v-toolbar-title class="navigation-wrapper">
        <nuxt-link class="main-title d-block" to="/"
          >Community Information Tool 2.0</nuxt-link
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
      <v-footer color="primary" height="66"></v-footer>
    </div>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommSearch from '~/components/CommSearch.vue'
@Component({
  CommSearch,
})
export default class DefaultLayout extends Vue {}
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
</style>
