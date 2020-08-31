<template>
  <div>
    <CommunityType ref="communityFilter" @filter="handleFilter"></CommunityType>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommunityType from '~/components/Explore/Filters/CommunityType'
import { advancedSearch } from '~/api/cit-api'

@Component({
  CommunityType,
})
export default class ExploreFilters extends Vue {
  handleFilter() {
    let params = {}
    const cf = this.$refs.communityFilter.getParams()
    params = Object.assign({}, cf)
    console.log('params', params)

    advancedSearch(params).then((result) => {
      this.$emit('filtered', result.data)
    })
  }
}
</script>
