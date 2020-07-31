<template>
  <div>
    <div>
      <h2>Explore communities in BC</h2>
    </div>
    <div class="main-report-container">
      <CommunityQuerySidebar @update-filters="updateFilters" />
      <CommunityQueryContent :filters="filters" />
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
export default class Index extends Vue {
  data() {
    return {
      filters: undefined,
    }
  }

  layout(context) {
    return 'default'
  }

  mounted() {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
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

iframe {
  border: 0 !important;
}
</style>
