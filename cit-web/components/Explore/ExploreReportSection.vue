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
            :cid="13050"
            extra-classname="demographics"
          ></ReportCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import ReportCard from '~/components/Explore/ReportCard'

@Component({
  ReportCard,
})
export default class ExploreReportSection extends Vue {
  reportCards = {
    Housing: [
      {
        name: 'Domestic',
        pid: 'ReportSection6249eac6d911d2930de3',
      },
      {
        name: 'Education',
        pid: 'ReportSection39f3a30707d51e04d585',
      },
      {
        name: 'Culture',
        pid: 'ReportSectionc275f231ed2c4af16a7d',
      },
    ],
    'Economics/Employment': [
      {
        name: 'Income/Jobs',
        pid: 'ReportSection65f0df6512cfb580c7a2',
      },
      {
        name: 'Natural Resources',
        pid: 'ReportSection88694206176b52607b4d',
      },
    ],
    'Assets & Infrastructure': [
      {
        name: 'Health & Emergency',
        pid: 'ReportSectionde977e8425990a550597',
      },
      {
        name: 'Government Services',
        pid: 'ReportSection01bb2d0bee74694f5cb3',
      },
      {
        name: 'Connectivity',
        pid: 'ReportSection498ce34a9e89c7c66ddd',
      },
    ],
  }
}
</script>
