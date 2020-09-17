<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="elevation-3 rounded-lg" style="cursor: pointer;">
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
        width="376"
        height="220"
        aspect-ratio="1"
        position="50% 15%"
      ></v-img>
      <v-card-text class="pt-5 pl-5 pr-5">
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

  dialog = false

  get showDialog() {
    return this.title === this.selectedReportName
  }

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
