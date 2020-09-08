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
        <p>{{ description }}</p>
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
            <v-toolbar-title>{{ title }} - {{ subtitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <Report
              :page-name="pageName"
              :cids="[cid]"
              extra-classname="demographics"
            ></Report>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-hover>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Report from '~/components/CommunityDetails/Report.vue'

@Component({
  Report,
})
export default class CommunityReportCard extends Vue {
  @Prop({ default: null, type: String }) pageName
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: String }) subtitle
  @Prop({ default: null, type: String }) description
  @Prop({ default: null, type: Number }) cid
  @Prop({ default: '', type: String }) extraClassname

  dialog = false
}
</script>
