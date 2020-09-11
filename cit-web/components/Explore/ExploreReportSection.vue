<template>
  <div class="explore-report-container">
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
          <ExploreReportCard
            :page-name="report.pid"
            :title="report.name"
            :description="report.description"
            :image="report.image"
            :cids="cids"
            :selected-report-name.sync="selectedReportName"
            extra-classname="demographics"
          ></ExploreReportCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import ExploreReportCard from '~/components/Explore/ExploreReportCard'
import ExplorePages from '~/data/explore/explorePages.json'

@Component({
  ExploreReportCard,
})
export default class ExploreReportSection extends Vue {
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: null, type: String }) selectedReportName

  reportCards = ExplorePages

  @Watch('selectedReportName')
  onSelectedReportNameChange() {
    this.$emit('update:selectedReportName', this.selectedReportName)
  }
}
</script>
<style lang="scss" scoped>
.explore-report-container {
  width: 1600px;
  margin: 0 auto;
}
</style>
