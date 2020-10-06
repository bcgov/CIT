<template>
  <div
    class="explore-report-container"
    :class="{ 'pa-10': !reportToShow, 'mb-10': !reportToShow }"
  >
    <div v-if="reportToShow" class="pl-0 pr-0 pt-10">
      <div class="d-flex align-center pl-10 pr-5">
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

      <v-card-text v-show="loaded" class="px-5 ma-0">
        <ExploreReport
          :page-name="reportToShow.pid"
          :cids="cids"
          height="1400"
          width="1600"
          @loaded="loaded = true"
        ></ExploreReport>
      </v-card-text>
    </div>
    <div v-else>
      <v-alert
        v-if="showInsufficientDataWarning"
        type="info"
        dismissible
        class="primary--text elevation-5"
      >
        <template v-if="communitiesWithInsufficientData.length > 1">
          {{ communitiesWithInsufficientData.length }} communities in your
          selection have incomplete census data.
        </template>
        <template v-if="communitiesWithInsufficientData.length === 1">
          1 community in your selection has incomplete census data.
        </template>
        <template v-if="reportsToHide"
          >Some reports have been hidden due to insufficient data.</template
        >
        The charts in the reports reflect available census data and may not
        accurately represent all communities.
        <a href="/footnotes#incomplete-census-data" target="_blank"
          >Learn more.</a
        >
      </v-alert>
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
          <div class="d-flex flex-wrap explore-report-card-wrapper">
            <div
              v-for="report in reportCard"
              :key="report.name"
              class="ma-3 explore-report-card-container"
            >
              <ExploreReportCard
                style="cursor: pointer;"
                :title="report.name"
                :description="report.description"
                :image="report.image"
                @click.native="handleCardClick(report.name)"
              ></ExploreReportCard>
            </div>
          </div>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import groupBy from 'lodash/groupBy'
import ExploreReportCard from '~/components/Explore/ExploreReportCard'

@Component({
  ExploreReportCard,
})
export default class ExploreReportSection extends Vue {
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: () => {}, type: Array }) reportCards
  @Prop({ default: null, type: Object }) reportToShow
  @Prop({ default: null, type: Array }) reportsToHide
  @Prop({ default: null, type: Array }) communitiesWithInsufficientData
  loaded = false

  get showInsufficientDataWarning() {
    return this.communitiesWithInsufficientData?.length > 0
  }

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
<style lang="scss">
.v-alert.info .v-icon {
  color: #193262;
}

@media screen and (max-width: 1252px) {
  .explore-report-card-wrapper {
    justify-content: center;
  }
}

@media screen and (max-width: 1050px) {
  .explore-report-card-wrapper {
    justify-content: normal;
  }
}

@media screen and (max-width: 831px) {
  .explore-report-card-wrapper {
    justify-content: center;
  }
}

@media screen and (max-width: 477px) {
  .explore-report-card-container {
    width: 100% !important;
  }
}
</style>
