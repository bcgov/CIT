<template>
  <div class="mt-4 mb-3 font-weight-bold d-flex align-center">
    <p class="text-body-1 mb-0 d-flex align-center">
      Locate communities and regional districts by selecting options below.
      <v-tooltip bottom color="primary" class="rounded-lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="primary">mdi-information</v-icon></v-btn
          >
        </template>
        <span class="text-body-1"
          >The data menu below will filter based on
          <span class="font-weight-bold"
            >all communities in British Columbia</span
          ></span
        >
      </v-tooltip>
    </p>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ExploreFilterHeader extends Vue {}
</script>
