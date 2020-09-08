<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :class="{ 'elevation-5': hover }" @click="dialog = true">
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
                ></v-img>
              </div>
            </div>
            <v-divider></v-divider>

            <div v-if="comparePageName">
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <Report
                      :page-name="pageName"
                      :cids="[cid]"
                      extra-classname="demographics"
                    ></Report>
                  </v-col>
                  <v-col cols="4">
                    <Report
                      :page-name="comparePageName"
                      :cids="[cid]"
                      extra-classname="demographics"
                    ></Report>
                  </v-col>
                  <v-col cols="4">
                    <Compare
                      :pid="comparePageName"
                      :rid="rid"
                      init-mode="Regional Districts"
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
              ></Report>
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
}
</script>
