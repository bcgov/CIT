<template>
  <div>
    <CommunityType
      ref="communityFilter"
      class="d-inline-block"
      @filter="handleFilter"
    ></CommunityType>
    <MoreFilters class="d-inline-block"></MoreFilters>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import CommunityType from '~/components/Explore/Filters/CommunityType'
import MoreFilters from '~/components/Explore/Filters/MoreFilters'

import { advancedSearch } from '~/api/cit-api'

@Component({
  CommunityType,
  MoreFilters,
})
export default class ExploreFilters extends Vue {
  handleFilter() {
    let filterParams = {}
    const cf = this.$refs.communityFilter.getParams()
    filterParams = Object.assign({}, cf)

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
