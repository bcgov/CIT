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
            :title="report.name"
            :cid="cid"
            extra-classname="demographics"
          ></ReportCard>
        </v-col>
      </v-row>
    </div>
  </div>
  <!--
        <Report
          page-name="ReportSection05fe7b2a55e727a0a41e"
          :cid="communityDetails.id"
          extra-classname="demographics"
        ></Report>
        <Report
          page-name="ReportSectionbc899e8fac8c2b494765"
          :cid="communityDetails.id"
          extra-classname="connectivity"
        ></Report>
        <Report
          page-name="ReportSectionc87b6c3907e9321ae830"
          :cid="communityDetails.id"
          extra-classname="community-assets"
        ></Report>
        <Report
          page-name="ReportSectionf2b8f5bb464e6d79a9ed"
          :cid="communityDetails.id"
          extra-classname="economic-projects"
        ></Report>
        <Report
          page-name="ReportSection8f523b520a86970e96d4"
          :cid="communityDetails.id"
          extra-classname="natural-resource-projects"
        ></Report>
        -->
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'

@Component({
  ReportCard,
})
export default class ReportSection extends Vue {
  @Prop({ default: null, type: Object }) reportCards
  @Prop({ default: null, type: Number }) cid
}
</script>
