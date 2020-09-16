<template>
  <div>
    <v-chip pill outlined @click="dialog = true">
      More Filters
    </v-chip>
    <v-dialog v-model="dialog" scrollable max-width="600">
      <v-card class="rounded-0">
        <v-toolbar dark>
          <v-toolbar-title>More Filters</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="height: 80vh;">
          <h2 class="text-h5 mt-5">Wildfire Zone</h2>
          <WildFire></WildFire>
          <h2 class="text-h5 mt-5">Tsunami Zone</h2>
          <Tsunami></Tsunami>
          <h2 class="text-h5 mt-5">More Options</h2>
          <Mills></Mills>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="bottom-action">
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import PopGrowth from '~/components/Explore/Filters/PopGrowth'
import Education from '~/components/Explore/Filters/Education'
import Health from '~/components/Explore/Filters/Health'
import Mills from '~/components/Explore/Filters/Mills'
import WildFire from '~/components/Explore/Filters/WildFire'
import Tsunami from '~/components/Explore/Filters/Tsunami'

@Component({
  PopGrowth,
  Education,
  Health,
  Mills,
  WildFire,
  Tsunami,
})
export default class MoreFilters extends Vue {
  dialog = false
}
</script>
