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
