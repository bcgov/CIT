<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :class="{ 'elevation-5': hover }" @click="dialog = true">
      <div style="width: 100%;">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          height="150px"
        ></v-img>
      </div>
      <v-card-text>
        <p class="body-1 text--primary pa-0 ma-0">
          {{ title }}
        </p>
        <p>Description goes here</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="deep-purple accent-4">
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
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <ExploreReport
              :page-name="pageName"
              :cids="cids"
              extra-classname="demographics"
            ></ExploreReport>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-hover>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ExploreReport from '~/components/Explore/ExploreReport.vue'

@Component({
  ExploreReport,
})
export default class ExploreReportCard extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: Array }) cids

  dialog = false
}
</script>
