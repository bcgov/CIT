<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :class="{ 'elevation-5': hover }"
      style="position: relative;"
      @click="dialog = true"
    >
      <v-expand-transition>
        <div
          v-if="hover"
          class="pa-7 d-flex align-center transition-fade-in indigo darken-4 v-card--reveal display-3 white--text hover-card"
          style="height: 100%;"
        >
          <p class="text-body-1">{{ description }}</p>
        </div>
      </v-expand-transition>
      <div style="width: 100%;">
        <v-img
          :src="require(`~/assets/images/${image}`)"
          contain
          max-height="190"
          aspect-ratio="1"
        ></v-img>
      </div>
      <v-card-text>
        <p class="body-1 text--primary pa-0 ma-0">
          {{ title }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="indigo accent-4">
          View Report
        </v-btn>
      </v-card-actions>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        :scrollable="false"
        style="overflow: hidden;"
      >
        <v-card>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }} - {{ subtitle }}</v-toolbar-title>
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
                  :src="require(`~/assets/images/${image}`)"
                  height="150px"
                  contain
                  aspect-ratio="1"
                ></v-img>
              </div>
            </div>
            <v-divider></v-divider>

            <div v-if="!isAllReportsLoaded">
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
            <div v-show="isAllReportsLoaded">
              <div v-if="comparePageName">
                <v-container fluid>
                  <v-row>
                    <v-col cols="4">
                      <Report
                        :page-name="pageName"
                        :cids="[cid]"
                        extra-classname="demographics"
                        @loaded="reportOneLoaded = true"
                      ></Report>
                    </v-col>
                    <v-col cols="4">
                      <Report
                        :page-name="comparePageName"
                        :cids="[cid]"
                        extra-classname="demographics"
                        @loaded="reportTwoLoaded = true"
                      ></Report>
                    </v-col>
                    <v-col cols="4">
                      <Compare
                        :loader="false"
                        :pid="comparePageName"
                        :rid="rid"
                        init-mode="Regional Districts"
                        @loaded="reportThreeLoaded = true"
                      ></Compare>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div v-else>
                <Report
                  :page-name="pageName"
                  :cids="[cid]"
                  extra-classname="demographics"
                  @loaded="reportOneLoaded = true"
                ></Report>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </v-hover>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Report from '~/components/CommunityDetails/Report.vue'
import Compare from '~/components/Compare'

@Component({
  Report,
  Compare,
})
export default class CommunityReportCard extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: String }) comparePageName
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) image
  @Prop({ default: null, type: String }) subtitle
  @Prop({ default: null, type: String }) description
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: '', type: String }) extraClassname

  dialog = false

  reportOneLoaded = false
  reportTwoLoaded = false
  reportThreeLoaded = false

  get isAllReportsLoaded() {
    if (this.cid) {
      return (
        this.reportOneLoaded && this.reportTwoLoaded && this.reportThreeLoaded
      )
    } else {
      return this.reportOneLoaded
    }
  }
}
</script>
<style lang="scss" scoped>
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
