<template>
  <div>
    <div v-for="(reportCard, key) in reportCards" :key="key">
      <v-row>
        <v-col col="12">
          <h3 class="d-flex align-center">
            <v-icon inline class="mr-3" color="primary">mdi-home</v-icon
            >{{ key }}
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="report in reportCard" :key="report.name" xl="3" lg="3">
          <ReportCard
            :page-name="report.pid"
            :compare-page-name="report.cpid"
            :title="report.name"
            :image="report.image"
            :description="report.description"
            :cid="cid"
            :rid="community.regional_district"
            :subtitle="placeName"
            @click.native="openReport(report.name)"
          ></ReportCard>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      :scrollable="false"
      style="overflow: hidden;"
      :value="showDialog"
      eager
      persistent
    >
      <div v-if="report" class="report-dialog-container">
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="closeReport">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="8">
                <DetailReportSection
                  :report="report"
                  :place-name="placeName"
                  :cid="cid"
                ></DetailReportSection>
              </v-col>
              <v-col cols="4">
                <DetailCompareSection
                  :report="report"
                  :rid="community.regional_district"
                ></DetailCompareSection>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import flatMap from 'lodash/flatMap'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import DetailReportSection from '~/components/CommunityDetails/DetailReportSection.vue'
import DetailCompareSection from '~/components/CommunityDetails/DetailCompareSection.vue'
import Compare from '~/components/Compare'

@Component({
  ReportCard,
  Report,
  Compare,
  DetailReportSection,
  DetailCompareSection,
})
export default class ReportSection extends Vue {
  @Prop({ default: null, type: Object }) reportCards
  @Prop({ default: null, type: String }) reportToOpen
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: null, type: Object }) community

  get flatReportCards() {
    return flatMap(this.reportCards)
  }

  get report() {
    return this.flatReportCards.find((r) => r.name === this.reportToOpen)
  }

  get showDialog() {
    if (!this.reportToOpen) {
      return false
    } else {
      return true
    }
  }

  openReport(data) {
    this.$emit('reportOpen', data)
  }

  closeReport() {
    this.$emit('reportClose')
  }
}
</script>
<style lang="scss" scoped>
.report-dialog-container {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
