<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            depressed
            color="primary"
            class="text-capitalize"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small class="mr-2">mdi-file-chart</v-icon>
            View Reports
          </v-btn>
          <v-btn
            small
            depressed
            color="primary"
            class="ml-2 text-capitalize"
            :href="`mailto:${citFeedbackEmail}?subject=CIT Feedback`"
          >
            <v-icon small class="mr-2">mdi-comment</v-icon>
            Give Feedback
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <ExploreReportSection
                :cids="cids"
                :selected-report-name.sync="selectedReportName"
              ></ExploreReportSection>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import ExploreReportSection from '~/components/Explore/ExploreReportSection'
@Component({
  ExploreReportSection,
})
export default class ReportDialog extends Vue {
  @Prop({ default: null, type: Array }) cids
  @Prop({ default: null, type: String }) selectedReportName
  @Prop({ default: null, type: Boolean }) showReportList

  dialog = false
  citFeedbackEmail = this.$config.citFeedbackEmail

  mounted() {
    this.handleDialogState()
  }

  handleDialogState() {
    if (this.showReportList || this.selectedReportName) {
      this.dialog = true
    } else {
      this.dialog = false
    }
  }

  @Watch('dialog')
  onDialogChange(val) {
    this.$emit('update:showReportList', val)
  }

  @Watch('showReportList')
  onShowReportListChange() {
    this.handleDialogState()
  }

  @Watch('selectedReportName')
  onSelectedReportNameChange() {
    this.$emit('update:selectedReportName', this.selectedReportName)
  }
}
</script>
