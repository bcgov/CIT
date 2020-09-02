<template>
  <div>
    <CommunityType
      ref="communityTypeFilter"
      class="d-inline-block"
      @filter="handleFilter"
    ></CommunityType>
    <Locations
      ref="locationsFilter"
      class="d-inline-block"
      @filter="handleFilter"
    ></Locations>
    <PopGrowth
      ref="popGrowthFilter"
      class="d-inline-block"
      @filter="handleFilter"
    ></PopGrowth>
    <MoreFilters class="d-inline-block"></MoreFilters>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import CommunityType from '~/components/Explore/Filters/CommunityType'
import PopGrowth from '~/components/Explore/Filters/PopGrowth'
import MoreFilters from '~/components/Explore/Filters/MoreFilters'
import Locations from '~/components/Explore/Filters/Locations'
import { advancedSearch } from '~/api/cit-api'

@Component({
  CommunityType,
  MoreFilters,
  PopGrowth,
  Locations,
})
export default class ExploreFilters extends Vue {
  handleFilter() {
    const refs = this.$refs
    let filterParams = {}
    for (const prop in refs) {
      const exploreFilter = refs[prop]
      exploreFilter.getParams().map((fp) => {
        filterParams = Object.assign(filterParams, fp)
      })
    }

    if (isEmpty(filterParams)) {
      this.$emit('filtered', { empty: true })
      return
    }

    advancedSearch(filterParams).then((result) => {
      this.$emit('filtered', { empty: false, data: result.data })
    })
  }
}
</script>
