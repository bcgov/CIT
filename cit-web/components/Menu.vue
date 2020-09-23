<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-list style="background-color: #073366;" class="pa-5">
      <v-list-item
        v-for="(mi, index) in menuItems"
        :key="index"
        class="pa-0 ma-0 font-weight-bold my-3"
        style="min-height: auto;"
      >
        <v-list-item-title class="white--text">{{
          mi.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Menu extends Vue {
  menuItems = [
    {
      title: 'Domestic',
      href: '/explore',
    },
    {
      title: 'Culture',
      href: '/explore',
    },
    {
      title: 'Education',
      href: '/explore',
    },
    {
      title: 'Income/Jobs',
      href: '/explore',
    },
    {
      title: 'Natural Resources',
      href: '/explore',
    },
    {
      title: 'Environment',
      href: '/explore',
    },
    {
      title: 'Connectivity',
      href: '/explore',
    },
    {
      title: 'Health & Emergency',
      href: '/explore',
    },
  ]
}
</script>
