<template>
  <div class="main-report-container">
    <MainReport />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MainReport from '~/components/MainReport.vue'
@Component({
  MainReport,
})
export default class CommunityQuery extends Vue {
  layout(context) {
    return 'fixed'
  }
}
</script>
<style lang="scss">
.main-report-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
}

iframe {
  border: 0 !important;
}
</style>
