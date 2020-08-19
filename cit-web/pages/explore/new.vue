<template>
  <div>
    <div v-if="isVisible" class="explore-filters-container pa-5 elevation-5">
      <div>
        <h4>Community Type</h4>
        <div>
          <v-checkbox
            class="mt-0"
            dense
            hide-details
            label="Indigenous"
          ></v-checkbox>
        </div>
        <div>
          <v-checkbox
            class="mt-0"
            dense
            hide-details
            label="Rural"
          ></v-checkbox>
        </div>
        <div>
          <v-checkbox
            class="mt-0"
            dense
            hide-details
            label="Urban"
          ></v-checkbox>
        </div>
      </div>
    </div>
    <div
      class="explore-content pa-4 h-100"
      :class="{ 'explore-content-full': !isVisible }"
    >
      <div class="d-inline-block">Applied Filters:</div>
      <div class="filter-list d-inline-block">
        <v-chip small color="primary" close>
          Applied Filters
        </v-chip>
      </div>

      <v-row no-gutters class="h-100 mt-4">
        <v-col cols="6">
          <div class="h-100">
            <CommunityQueryContent class="main-report h-100" :filters="{}" />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="explore-map h-100">
            <Map :api-key="MAPBOX_API_KEY"></Map>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommunityQueryContent from '~/components/CommunityQuery/CommunityQueryContent.vue'

import Map from '~/components/Map.vue'
@Component({
  Map,
  CommunityQueryContent,
})
export default class Explore extends Vue {
  isVisible = true
  layout(context) {
    return 'fixed'
  }

  asyncData({ $config: { MAPBOX_API_KEY } }) {
    return {
      MAPBOX_API_KEY,
    }
  }

  mounted() {
    this.$root.$on('sidebar-toggle', () => {
      this.isVisible = !this.isVisible
      this.$root.$emit('map-resize')
    })
  }
}
</script>
<style lang="scss">
.explore-filters-container {
  position: fixed;
  top: 66px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  min-width: 250px;
  z-index: 50;
  background-color: white;
}
.v-application .explore-content {
  padding-left: 260px !important;
}

.v-application .explore-content.explore-content-full {
  padding-left: 10px !important;
}

.h-100 {
  height: 100%;
}
</style>
