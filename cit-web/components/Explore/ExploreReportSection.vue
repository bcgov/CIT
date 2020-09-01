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
        pid: 'ReportSectiona6891d7c6caa01ac431d',
      },
      {
        name: 'Education',
        pid: 'ReportSection2e89dc5afd87ef0ae354',
      },
      {
        name: 'Culture',
        pid: 'ReportSectioned265c9a280b2bf7a925',
      },
    ],
    'Economics/Employment': [
      {
        name: 'Income/Jobs',
        pid: 'ReportSectionf2b8f5bb464e6d79a9ed',
      },
      {
        name: 'Natural Resources',
        pid: 'ReportSection8f523b520a86970e96d4',
      },
    ],
    'Assets & Infrastructure': [
      {
        name: 'Health & Emergency',
        pid: 'ReportSection07d9e73c5386ee5b1645',
      },
      {
        name: 'Government Services',
        pid: 'ReportSectionb573e08eb7a7e160fd80',
      },
      {
        name: 'Connectivity',
        pid: 'ReportSectionbc899e8fac8c2b494765',
      },
    ],
  }
}
</script>
