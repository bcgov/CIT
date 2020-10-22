<template>
  <v-dialog
    ref="reportDialog"
    fullscreen
    transition="dialog-bottom-transition"
    hide-overlay
    :value="show"
    @keydown.esc.prevent="$emit('close')"
  >
    <v-card>
      <div
        v-if="report"
        class="report-dialog-container"
        style="padding-top: 60px;"
      >
        <v-app-bar flat dark color="primary" fixed>
          <v-btn icon dark @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <CompareInfo></CompareInfo>
        </v-app-bar>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <ReportHeader
                :name="report.name"
                :description="report.description"
                :image="report.image"
                :place-name="placeName"
              ></ReportHeader>
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="4" lg="4" md="12" sm="12" cols="12">
              <DetailReportSection
                :report="report"
                :place-name="placeName"
                :cid="communityDetails.id"
              ></DetailReportSection>
            </v-col>
            <v-col xl="8" lg="8" md="12" sm="12" cols="12">
              <DetailCompareSection
                :report="report"
                :rid="communityDetails.regional_district"
                :cid="communityDetails.id"
                :region-name="regionName"
              ></DetailCompareSection>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="rounded-xl">
                <ReportTraverse @traverse="handleTraverse"></ReportTraverse>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
const compareStore = namespace('compare')
@Component
export default class CommunityDetailsReportModal extends Vue {
  @Prop({ default: false, type: Boolean }) show
  @Prop({ default: null, type: Object }) report
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: String }) regionName
  @Prop({ default: null, type: Object }) communityDetails

  @compareStore.Getter('getCompare') compare
  @compareStore.Getter('getCompareMode') compareMode

  handleTraverse(data) {
    this.$emit('traverse', data)
  }

  mounted() {
    this.$root.$on('reportModalToTop', () => {
      this.$nextTick(() => {
        const el = document.querySelector('.v-dialog')
        el.scrollTop = 0
      })
    })
  }
}
</script>
<style lang="scss">
.v-dialog__content {
  z-index: 5005 !important;
}
</style>
