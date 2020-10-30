<template>
  <div>
    <v-sheet
      class="d-flex align-center elevation-5 px-5 py-2"
      :class="{ 'flex-column': isMobile }"
    >
      <FeedbackButton></FeedbackButton>
      <ShareButton class="ml-2"></ShareButton>
      <CloseReportButton class="ml-2"></CloseReportButton>
      <v-spacer></v-spacer>
      <div class="mr-2" :class="{ 'mt-2': isMobile, 'mr-0': isMobile }">
        Choose another report
      </div>
      <div class="report-traverse-select" :class="{ 'my-5': isMobile }">
        <multiselect
          v-model="selected"
          :options="items"
          :close-on-select="true"
          :clear-on-select="true"
          :preserve-search="true"
          label="name"
          track-by="name"
          @input="handleUpdate"
        >
        </multiselect>
      </div>
      <v-btn
        :block="isMobile"
        class="ml-3"
        :class="{ 'ml-0': isMobile }"
        color="primary"
        @click="handleClick"
        >Go</v-btn
      >
    </v-sheet>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import reportPages from '~/data/communityDetails/reportPages.json'
@Component
export default class ReportTraverse extends Vue {
  items = reportPages
  selected = reportPages.find((rp) => rp.name === 'Housing')

  isHydrated = false
  get isMobile() {
    if (this.isHydrated === true) {
      return this.$vuetify.breakpoint.width < 559
    } else {
      return false
    }
  }

  handleClick() {
    this.$root.$emit('reportModalToTop')
    this.$emit('traverse', this.selected.name)
  }

  mounted() {
    this.isHydrated = true
  }
}
</script>
<style lang="scss" scoped>
.report-traverse-select {
  max-width: 250px;
}

@media screen and (max-width: 559px) {
  .report-traverse-select {
    max-width: auto !important;
    width: 100;
  }
}
</style>
