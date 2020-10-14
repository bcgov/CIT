<template>
  <div>
    <v-menu
      offset-y
      class="nav-menu"
      :close-on-content-click="false"
      content-class="nav-menu"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list style="background-color: #073366;" class="pa-5">
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
          :to="'/explore?tab=Map'"
        >
          <v-list-item-title class="white--text">Explore</v-list-item-title>
        </v-list-item>
        <v-list-item-title class="mt-5">
          <h6 class="text-h6 font-weight-bold white--text">
            Aggregate Reports
          </h6>
        </v-list-item-title>
        <v-list-item
          v-for="(mi, index) in menuItemsSorted"
          :key="index"
          class="pa-0 ma-0 font-weight-normal my-3"
          style="min-height: auto;"
          :to="mi.href"
        >
          <v-list-item-title class="white--text">{{
            mi.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-sheet v-if="showSearch" color="white" class="pa-5">
        <CommSearch></CommSearch>
      </v-sheet>
      <v-divider></v-divider>
      <v-sheet color="white" class="d-flex justify-center align-center">
        <v-btn
          :href="`mailto:${this.$config.citFeedbackEmail}?subject=CIT Feedback`"
          block
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

@Component({
  CommSearch,
})
export default class Menu extends Vue {
  get menuItemsSorted() {
    return sortBy(this.menuItems, 'title')
  }

  menuItems = [
    {
      title: 'Domestic',
      href: '/explore?tab=Reports&report=Domestic',
    },
    {
      title: 'Culture',
      href: '/explore?tab=Reports&report=Culture',
    },
    {
      title: 'Education',
      href: '/explore?tab=Reports&report=Education',
    },
    {
      title: 'Income/Jobs',
      href: '/explore?tab=Reports&report=Income/Jobs',
    },
    {
      title: 'Natural Resources',
      href: '/explore?tab=Reports&report=Natural Resources',
    },
    {
      title: 'Economic Projects',
      href: '/explore?tab=Reports&report=Economic Projects',
    },
    {
      title: 'Connectivity',
      href: '/explore?tab=Reports&report=Connectivity',
    },
    {
      title: 'Health & Emergency',
      href: '/explore?tab=Reports&report=Health & Emergency',
    },
  ]

  get showSearch() {
    return this.$vuetify.breakpoint.width < 850
  }
}
</script>
<style lang="scss">
.nav-menu {
  background-color: white !important;
}
</style>
