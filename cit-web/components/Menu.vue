<template>
  <div>
    <v-menu
      offset-y
      class="nav-menu px-10"
      :close-on-content-click="true"
      content-class="nav-menu"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list style="background-color: #073366;" class="px-5 py-1" width="225">
        <v-list-item
          class="pa-0 ma-0 font-weight-normal my-3"
          style="min-height: auto;"
          :to="'/'"
        >
          <v-list-item-title class="white--text">Home</v-list-item-title>
        </v-list-item>
        <v-list-item
          class="pa-0 ma-0 font-weight-normal my-3"
          style="min-height: auto;"
          :to="'/explore'"
        >
          <v-list-item-title class="white--text">Explore</v-list-item-title>
        </v-list-item>
        <v-list-item
          class="pa-0 ma-0 font-weight-normal my-3"
          style="min-height: auto;"
          :to="'/footnotes'"
        >
          <v-list-item-title class="white--text"
            >Data Remarks</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <div
        style="background-color: rgba(255, 255, 255, 0.1); height: 1px;"
      ></div>
      <v-list style="background-color: #073366;" class="px-5">
        <v-list-item-title>
          <h6 class="text-body-1 font-weight-bold white--text">
            Aggregate Reports
          </h6>
        </v-list-item-title>
        <v-list-item
          v-for="(mi, index) in sortBy(menuItems, 'title')"
          :key="index"
          class="pa-0 ma-0 font-weight-normal my-3"
          style="min-height: auto;"
          :to="`/explore?tab=Reports&report=${encodeURIComponent(mi.name)}`"
        >
          <v-list-item-title class="white--text">{{
            mi.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-sheet v-if="showSearch" color="white" class="pa-5">
        <CommSearch></CommSearch>
      </v-sheet>
      <div
        style="background-color: rgba(255, 255, 255, 0.1); height: 1px;"
      ></div>
      <v-sheet
        color="primary"
        class="d-flex justify-center align-center white--text"
      >
        <v-btn
          color="primary"
          :href="`mailto:${$config.citFeedbackEmail}?subject=CIT Feedback`"
          block
          class="text-capitalize"
          >Give Feedback</v-btn
        >
      </v-sheet>
    </v-menu>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import sortBy from 'lodash/sortBy'
import CommSearch from '~/components/CommSearch.vue'
import aggReports from '~/data/explore/explorePages.json'

@Component({
  CommSearch,
  methods: {
    sortBy,
  },
})
export default class Menu extends Vue {
  menuItems = aggReports

  get showSearch() {
    return this.$vuetify.breakpoint.width < 850
  }
}
</script>
<style lang="scss">
.nav-menu {
  background-color: #073366 !important;
}
.nav-menu .v-list-item--active {
  color: transparent;
}
</style>
