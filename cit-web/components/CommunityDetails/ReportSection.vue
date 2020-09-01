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
