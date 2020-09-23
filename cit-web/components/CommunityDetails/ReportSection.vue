<template>
  <div>
    <div v-for="(reportCard, key) in groupedReportCards" :key="key">
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
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
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
  @Prop({ default: null, type: Array }) reportCards
  @Prop({ default: null, type: String }) reportToOpen
  @Prop({ default: null, type: Array }) reportsToHide
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: null, type: Object }) community

  get groupedReportCards() {
    if (!this.reportsToHide) {
      return groupBy(this.reportCards, 'group')
    } else {
      const filtered = this.reportCards.filter((rc) => {
        const report = this.reportsToHide.find((rth) => rth === rc.pid)
        return !report
      })
      return groupBy(filtered, 'group')
    }
  }

  get report() {
    return this.reportCards.find((r) => r.name === this.reportToOpen)
  }

  openReport(data) {
    this.$emit('reportOpen', data)
  }

  closeReport() {
    this.$emit('reportClose')
  }
}
</script>
