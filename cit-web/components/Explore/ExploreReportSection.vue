<template>
  <div
    class="explore-report-container"
    :class="{ 'pa-10': !reportToShow, 'mb-10': !reportToShow }"
  >
    <div v-if="reportToShow" class="pl-0 pr-0 pt-10">
      <div class="d-flex align-center pl-5 pr-5">
        <div>
          <h6 class="text-h5">{{ reportToShow.name }}</h6>
          <p style="max-width: 800px;">{{ reportToShow.description }}</p>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-img
            :src="
              require(`~/assets/images/reports/headers/${reportToShow.image}`)
            "
            contain
            width="376"
            max-height="190"
            aspect-ratio="1"
          ></v-img>
        </div>
      </div>
      <v-divider></v-divider>

      <div v-if="!loaded">
        <h6 class="text-h6 text-center mt-10 mb-10">
          Generating your report
        </h6>
        <div class="progress-reportcard">
          <v-progress-linear
            color="indigo accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </div>
      </div>

      <v-card-text v-show="loaded" class="pa-0 ma-0">
        <ExploreReport
          :page-name="reportToShow.pid"
          :cids="cids"
          height="1200"
          width="1200"
          @loaded="loaded = true"
        ></ExploreReport>
      </v-card-text>
    </div>
    <div v-else>
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
          <v-col v-for="report in reportCard" :key="report.name" xl="4" lg="4">
            <ExploreReportCard
              style="cursor: pointer;"
              :title="report.name"
              :description="report.description"
              :image="report.image"
              @click.native="handleCardClick(report.name)"
            ></ExploreReportCard>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ExploreReportCard from '~/components/Explore/ExploreReportCard'

@Component({
  ExploreReportCard,
})
export default class ExploreReportSection extends Vue {
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: () => {}, type: Object }) reportCards
  @Prop({ default: null, type: Object }) reportToShow
  loaded = false

  handleCardClick(data) {
    this.$emit('showReport', data)
  }
}
</script>
<style lang="scss" scoped>
.explore-report-container {
  max-width: 1600px;
  margin: 0 auto;
  overflow-y: auto;
}
</style>
