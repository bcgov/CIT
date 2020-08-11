<template>
  <div>
    <p v-for="community in communities" :key="community.id">
      <a :href="'/community/' + community.id">{{ community.place_name }}</a>
    </p>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { getCommunityList } from '~/api/cit-api'

@Component
export default class CommunityList extends Vue {
  communities = []

  mounted() {
    this.getCommunities()
  }

  async getCommunities() {
    let response = await getCommunityList()
    const communities = [...response.data.results]
    while (response.data.next) {
      const nextUrl = response.data.next.split('/')
      const nextParams = nextUrl[nextUrl.length - 1]
      response = await getCommunityList(nextParams)
      communities.push(...response.data.results)
    }
    this.communities = communities
  }
}
</script>
