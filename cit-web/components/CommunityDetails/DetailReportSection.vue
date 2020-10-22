<template>
  <div>
    <v-card class="rounded-lg">
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

@Component
export default class DetailReportSection extends Vue {
  @Prop({ default: null, type: Object }) report
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) cid
}
</script>
