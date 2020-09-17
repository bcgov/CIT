<template>
  <div>
    <v-card class="rounded-lg">
      <ReportHeader
        :name="report.name"
        :description="report.description"
        :image="report.image"
        :place-name="placeName"
      ></ReportHeader>
      <DetailedReports
        :cid="cid"
        :pid="report.pid"
        :cpid="report.cpid"
      ></DetailedReports>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ReportHeader from '~/components/CommunityDetails/ReportHeader'
import DetailedReports from '~/components/CommunityDetails/DetailedReports'
@Component({ ReportHeader, DetailedReports })
export default class DetailReportSection extends Vue {
  @Prop({ default: null, type: Object }) report
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) cid
}
</script>
