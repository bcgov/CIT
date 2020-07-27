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
export default class Index extends Vue {
  mounted() {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
  }
}
</script>
<style lang="scss">
.main-report-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2em;
}

iframe {
  border: 0 !important;
}
</style>
