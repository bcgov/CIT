<template>
  <div>
    <MainHeader
      title="Welcome to the Community Information Tool"
      subtitle="Click through the pages of this dashboard to analyze how B.C. communities are being served ….."
    />
    <MainReport />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import MainHeader from '~/components/MainHeader.vue'
import MainReport from '~/components/MainReport.vue'
@Component({
  MainHeader,
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
