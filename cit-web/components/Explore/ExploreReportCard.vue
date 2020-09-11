<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="elevation-3 rounded-lg" @click="openReport">
      <v-expand-transition>
        <div
          v-if="hover"
          class="rounded-lg pa-7 d-flex align-center transition-fade-in indigo darken-4 v-card--reveal display-3 white--text hover-card"
          style="height: 100%;"
        >
          <p class="text-body-1">{{ description }}</p>
        </div>
      </v-expand-transition>

      <v-img
        :src="require(`~/assets/images/reports/${image}`)"
        cover
        width="100%"
        height="220"
        aspect-ratio="1"
        position="50% 15%"
      ></v-img>

      <v-card-text>
        <p class="text-h6 text--primary pa-0 ma-0 font-weight-regular">
          {{ title }}
        </p>
      </v-card-text>
      <v-card-actions class="pl-5 pr-5 pb-5">
        <v-spacer></v-spacer>
        <v-btn color="primary" small height="45">
          <v-icon color="white">mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlayw
        transition="dialog-bottom-transition"
        :scrollable="false"
        style="overflow: hidden;"
      >
        <v-card>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="closeReport">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <div class="pa-10">
            <div class="d-flex align-center">
              <div>
                <h6 class="text-h5">{{ title }}</h6>
                <p style="max-width: 800px;">{{ description }}</p>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-img
                  :src="require(`~/assets/images/reports/headers/${image}`)"
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

            <v-card-text v-show="loaded">
              <ExploreReport
                :page-name="pageName"
                :cids="cids"
                @loaded="loaded = true"
              ></ExploreReport>
            </v-card-text>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </v-hover>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import ExploreReport from '~/components/Explore/ExploreReport.vue'

@Component({
  ExploreReport,
})
export default class ExploreReportCard extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) image
  @Prop({ default: null, type: String }) description
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: null, type: String }) selectedReportName

  dialog = false
  loaded = false

  mounted() {
    this.handleDialogState()
  }

  @Watch('selectedReportName')
  onSelectedReportNameChange() {
    this.handleDialogState()
  }

  openReport() {
    this.$emit('update:selectedReportName', this.getReportSlug(this.title))
  }

  closeReport() {
    this.$emit('update:selectedReportName', null)
  }

  handleDialogState() {
    const reportName = this.getReportSlug(this.title)

    if (!this.selectedReportName) {
      this.dialog = false
    } else if (this.selectedReportName === reportName) {
      this.dialog = true
    }
  }

  getReportSlug(reportName) {
    return encodeURIComponent(reportName.replace(' ', ''))
  }
}
</script>
<style lang="scss">
.progress-reportcard {
  max-width: 400px;
  margin: 0 auto;
}

.hover-card {
  position: absolute;
  top: 0;
  z-index: 5;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}
</style>
