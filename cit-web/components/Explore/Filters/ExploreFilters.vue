<template>
  <div>
    <RegionalDistricts
      ref="regionalDistrictsFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></RegionalDistricts>
    <CommunityType
      ref="communityTypeFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></CommunityType>
    <Locations
      ref="locationsFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Locations>
    <PopGrowth
      ref="popGrowthFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></PopGrowth>
    <Connectivity
      ref="connectivityFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Connectivity>
    <Substation
      ref="substationFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></Substation>
    <EmergencyRisk
      ref="emergencyRiskFilter"
      class="mb-3"
      :disabled="disabled"
      @filter="handleFilter"
    ></EmergencyRisk>

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
import Locations from '~/components/Explore/Filters/Locations'
import Substation from '~/components/Explore/Filters/Substation'
import EmergencyRisk from '~/components/Explore/Filters/EmergencyRisk'

import { advancedSearch } from '~/api/cit-api'

@Component({
  CommunityType,
  PopGrowth,
  Locations,
  RegionalDistricts,
  Connectivity,
  Substation,
  EmergencyRisk,
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

    advancedSearch(filterParams)
      .then((result) => {
        this.$emit('filtered', {
          empty: false,
          data: result.data.communities,
          reportsToHide: result.data.hidden_report_pages,
          communitiesWithInsufficientData:
            result.data.communities_with_insufficient_data,
        })

        this.$emit('error', false)
      })
      .catch((e) => {
        console.error(e)
        this.reset()
        this.$emit('error', true)
      })
      .finally(() => {
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
