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
import { getAuthToken } from '~/api/ms-auth-api/'
import MainHeader from '~/components/MainHeader.vue'
import MainReport from '~/components/MainReport.vue'
export default {
  components: {
    MainHeader,
    MainReport,
  },

  asyncData({ store }) {
    getAuthToken().then((response) => {
      const { status } = response
      if (status === 200) {
        const accessToken = response.data && response.data.access_token
        if (accessToken) {
          store.commit('msauth/setAccessToken', accessToken)
        }
      }
    })
  },
}
</script>
