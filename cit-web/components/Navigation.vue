<template>
  <div>
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <v-img
        style="cursor: pointer;"
        :src="require('~/assets/logo.svg')"
        aspect-ratio="1"
        width="177"
        height="43"
        @click="$router.push({ path: '/' })"
      ></v-img>
      <client-only>
        <v-toolbar-title class="navigation-wrapper">
          <nuxt-link class="main-title d-block font-weight-bold" to="/">{{
            getTitle
          }}</nuxt-link>
        </v-toolbar-title>
        <div v-if="hideSearch" style="min-width: 300px;">
          <CommSearch color="white" :solo="true" :dense="true"></CommSearch>
        </div>
      </client-only>
      <Menu></Menu>
    </v-app-bar>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import Menu from '~/components/Menu'
import CommSearch from '~/components/CommSearch.vue'

@Component({
  Menu,
  CommSearch,
})
export default class Navigation extends Vue {
  get hideSearch() {
    return !(this.$vuetify.breakpoint.width < 850)
  }

  get getTitle() {
    return this.$vuetify.breakpoint.width < 532
      ? 'CIT'
      : 'Community Information Tool'
  }
}
</script>
<style lang="scss" scoped>
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
