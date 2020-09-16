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
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      :scrollable="false"
      style="overflow: hidden;"
      :value="showDialog"
      eager
      persistent
    >
      <div v-if="report" class="report-dialog-container">
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="closeReport">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >{{ report.name }} - {{ placeName }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card>
          <div class="pa-10">
            <div class="d-flex align-center">
              <div>
                <h6 class="text-h5">{{ report.name }}</h6>
                <p style="max-width: 800px;">{{ report.description }}</p>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-img
                  :src="
                    require(`~/assets/images/reports/headers/${report.image}`)
                  "
                  contain
                  width="376"
                  max-height="190"
                  aspect-ratio="1"
                ></v-img>
              </div>
            </div>
            <v-divider></v-divider>
            <v-container fluid>
              <v-row no-gutters xl="3" lg="3" justify="center">
                <v-col cols="4">
                  <Report
                    :page-name="report.pid"
                    :cids="[cid.toString()]"
                    height="1000"
                    width="400"
                  ></Report>
                </v-col>
                <v-col cols="4">
                  <h5
                    class="text-center text-h4 font-weight-normal d-flex align-center justify-center"
                    style="height: 104px;"
                  >
                    Your community:
                  </h5>
                  <Report
                    :page-name="report.cpid"
                    :cids="[cid.toString()]"
                    height="1000"
                    width="400"
                  ></Report>
                </v-col>
                <v-col cols="4">
                  <Compare
                    :loader="false"
                    :pid="report.cpid"
                    :rid="community.regional_district"
                    init-mode="Regional Districts"
                    height="1000"
                    width="400"
                  ></Compare>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import flatMap from 'lodash/flatMap'
import ReportCard from '~/components/CommunityDetails/ReportCard.vue'
import Report from '~/components/CommunityDetails/Report.vue'
import Compare from '~/components/Compare'

@Component({
  ReportCard,
  Report,
  Compare,
})
export default class ReportSection extends Vue {
  @Prop({ default: null, type: Object }) reportCards
  @Prop({ default: null, type: String }) reportToOpen
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: null, type: Object }) community

  get flatReportCards() {
    return flatMap(this.reportCards)
  }

  get report() {
    return this.flatReportCards.find((r) => r.name === this.reportToOpen)
  }

  get showDialog() {
    if (!this.reportToOpen) {
      return false
    } else {
      return true
    }
  }

  openReport(data) {
    this.$emit('reportOpen', data)
  }

  closeReport() {
    this.$emit('reportClose')
  }
}
</script>
<style lang="scss" scoped>
.report-dialog-container {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
