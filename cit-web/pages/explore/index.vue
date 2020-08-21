<template>
  <div>
    <div>
      <h2>Explore communities in BC</h2>
    </div>
    <div class="main-report-container">
      <CommunityQuerySidebar class="sidebar" @update-filters="updateFilters" />
      <CommunityQueryContent class="main-report" :filters="filters" />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommunityQuerySidebar from '~/components/CommunityQuery/CommunityQuerySidebar.vue'
import CommunityQueryContent from '~/components/CommunityQuery/CommunityQueryContent.vue'
import { getAuthToken } from '~/api/ms-auth-api/'
import { getCommunityList } from '~/api/cit-api'

@Component({
  CommunityQuerySidebar,
  CommunityQueryContent,
})
export default class Explore extends Vue {
  data() {
    return {
      filters: undefined,
    }
  }

  async fetch({ store }) {
    try {
      const response = await getAuthToken()
      const { status } = response
      if (status === 200) {
        const accessToken = response.data && response.data.access_token
        if (accessToken) {
          store.commit('msauth/setAccessToken', accessToken)
        }
      }
    } catch (e) {
      store.commit('msauth/setAccessToken', null)
    }

    try {
      const response = await getCommunityList()
      const { status } = response
      if (status === 200) {
        const communities = response.data
        if (communities) {
          store.commit('communities/setCommunities', communities)
        }
      }
    } catch (e) {
      store.commit('communities/setCommunities', [])
    }
  }

  asyncData({ $config: { MAPBOX_API_KEY } }) {
    return {
      MAPBOX_API_KEY,
    }
  }

  updateFilters(filters) {
    this.filters = filters
  }
}
</script>
<style lang="scss">
.main-report-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
  display: flex;
}
.sidebar {
  flex: 1;
}
.main-report {
  flex: 3;
}
iframe {
  border: 0 !important;
}
</style>
