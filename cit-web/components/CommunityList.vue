<template>
  <div class="community-search">
    <input
      v-model="communityName"
      type="text"
      class="community-name"
      placeholder="Community name"
      @click="toggleResults"
      @keyup="communitySearch"
      @keyup.enter="communitySearch"
      @keyup.escape="hideResults"
    />
    <button type="button" class="community-search-btn" @click="goToCommunity()">
      Go
    </button>
    <div class="community-results-wrapper">
      <div v-if="filteredCommunities.length" class="community-results">
        <a
          v-for="community in filteredCommunities"
          :key="community.id"
          class="community-result"
          :class="{ selected: selectedCommunityId === community.id }"
          :href="'/community/' + community.id"
          target="_blank"
        >
          {{ community.place_name }}
        </a>
        <span v-if="communityName && loading">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { getCommunityList } from '~/api/cit-api'

@Component
export default class CommunityList extends Vue {
  communities = []
  filteredCommunities = []
  loading = false
  communityName = ''
  selectedCommunityId = undefined

  mounted() {
    this.getCommunities()
  }

  async getCommunities() {
    this.loading = true
    const response = await getCommunityList()
    this.communities = [...response.data]
    this.loading = false

    if (this.communityName) {
      this.communitySearch()
    }
  }

  communitySearch() {
    this.selectedCommunityId = undefined

    if (!this.communityName) {
      this.filteredCommunities = []
      return
    }

    console.log('communitySearch', this.communityName)
    this.filteredCommunities = this.communities.filter((community) => {
      return community.place_name
        .toLowerCase()
        .includes(this.communityName.toLowerCase())
    })
    if (this.filteredCommunities.length && !this.selectedCommunityId) {
      this.selectedCommunityId = this.filteredCommunities[0].id
    }
  }

  goToCommunity() {
    if (!this.selectedCommunityId) return

    console.log('goToCommunity', this.selectedCommunityId)
    window.open(`/community/${this.selectedCommunityId}`)
  }

  toggleResults() {
    if (this.communityName) {
      if (this.filteredCommunities.length) {
        this.filteredCommunities = []
      } else {
        this.communitySearch()
      }
    }
  }
}
</script>
<style lang="scss">
.community-results-wrapper {
  position: relative;
}

.community-results {
  position: absolute;
  width: 20rem;
  height: 12rem;
  overflow: auto;
  background-color: white;
  border: 1px solid #cdcdcd;
}

.community-result {
  display: block;
  padding: 0.2rem 0.5rem;

  &.selected {
    background-color: #eee;
  }

  &:hover {
    background-color: #eee;
  }
}

.community-name {
  width: 20rem;
  box-sizing: border-box;
  border: 1px solid #787878;
  background-color: white;
  padding: 0.3rem 0.5rem;
}

.community-search-btn {
  background-color: #073366;
  border: 1px solid white;
  color: white;
  padding: 0.35rem 1rem;
}
</style>
