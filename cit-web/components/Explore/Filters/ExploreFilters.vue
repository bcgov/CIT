<template>
  <div>
    <RegionalDistricts
      ref="regionalDistrictsFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></RegionalDistricts>
    <CommunityType
      ref="communityTypeFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></CommunityType>
    <Locations
      ref="locationsFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Locations>
    <PopGrowth
      ref="popGrowthFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></PopGrowth>
    <Connectivity
      ref="connectivityFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Connectivity>
    <Substation
      ref="substationFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Substation>
    <Wildfire
      ref="wildfireFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Wildfire>
    <Tsunami
      ref="tsunamiFilter"
      class="d-inline-block mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Tsunami>

    <v-chip
      v-if="numActive > 0"
      pill
      color="red darken-2"
      class="white--text"
      style="cursor: pointer;"
      :disabled="disabled"
      @click="reset"
    >
      Reset All Filters
    </v-chip>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import CommunityType from '~/components/Explore/Filters/CommunityType'
import PopGrowth from '~/components/Explore/Filters/PopGrowth'
import RegionalDistricts from '~/components/Explore/Filters/RegionalDistricts'
import Connectivity from '~/components/Explore/Filters/Connectivity'
import MoreFilters from '~/components/Explore/Filters/MoreFilters'
import Locations from '~/components/Explore/Filters/Locations'
import Substation from '~/components/Explore/Filters/Substation'
import Wildfire from '~/components/Explore/Filters/Wildfire'
import Tsunami from '~/components/Explore/Filters/Tsunami'

import { advancedSearch } from '~/api/cit-api'

@Component({
  CommunityType,
  MoreFilters,
  PopGrowth,
  Locations,
  RegionalDistricts,
  Connectivity,
  Substation,
  Wildfire,
  Tsunami,
})
export default class ExploreFilters extends Vue {
  @Prop({ default: false, type: Boolean }) disabled

  numActive = 0

  handleFilter() {
    const refs = this.$refs
    let filterParams = {}
    for (const prop in refs) {
      const exploreFilter = refs[prop]
      exploreFilter.getParams().map((fp) => {
        filterParams = Object.assign(filterParams, fp)
      })
    }

    this.updateActive()

    if (isEmpty(filterParams)) {
      this.$emit('filtered', { empty: true })
      return
    }
    this.$emit('loading', true)

    advancedSearch(filterParams).then((result) => {
      this.$emit('filtered', {
        empty: false,
        data: result.data.communities,
        reportsToHide: result.data.hidden_report_pages,
        communitiesWithInsufficientData:
          result.data.communities_with_insufficient_data,
      })
      this.$emit('loading', false)
    })
  }

  updateActive() {
    let counter = 0
    const refs = this.$refs
    for (const prop in refs) {
      const exploreFilter = refs[prop]
      if (exploreFilter.active === true) {
        counter++
      }
    }
    this.numActive = counter
  }

  reset() {
    const refs = this.$refs
    for (const prop in refs) {
      const exploreFilter = refs[prop]
      exploreFilter.reset()
    }
    this.$nextTick(() => {
      this.handleFilter()
    })
  }
}
</script>
