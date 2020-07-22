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
import MainHeader from '~/components/MainHeader.vue'
import MainReport from '~/components/MainReport.vue'
export default {
  components: {
    MainHeader,
    MainReport,
  },
}
</script>
