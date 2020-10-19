<template>
  <div>
    <v-container
      fluid
      style="
        height: 210px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      "
      class="compare-input-container"
    >
      <v-row>
        <v-col sm="12" class="white--text">
          Compare To
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12">
          <CompareSelect
            ref="compareSelect"
            :value="mode"
            :items="compareStates"
            @changed="handleSelectChange"
          ></CompareSelect>

          <CompareAutocomplete
            v-show="showAutoComplete"
            ref="compareAutoComplete"
            :items="items"
            item-value="id"
            :item-text="itemText"
            :multiple="true"
            class="mt-4"
            :value="rid"
            @change="handleChange"
          ></CompareAutocomplete>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="cidsEmpty">
      <v-alert type="info" class="primary--text elevation-5">
        Please select a community, regional district or All of BC.
      </v-alert>
    </div>
    <div v-else>
      <v-container fluid>
        <v-row no-gutters>
          <v-col sm="12">
            <Report
              :page-name="pid"
              :cids="cids"
              extra-classname="demographics"
              :height="height"
              :width="width"
              @loaded="handleLoaded"
            ></Report>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import CompareAutocomplete from '~/components/CompareAutocomplete'
import CompareSelect from '~/components/CompareSelect'
import Report from '~/components/CommunityDetails/Report'
const commModule = namespace('communities')
@Component({
  CompareAutocomplete,
  Report,
  CompareSelect,
})
export default class Compare extends Vue {
  @Prop({ default: 'ReportSection6249eac6d911d2930de3', type: String }) pid
  @Prop({ default: 'Average Of B.C.', type: String }) mode
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: true, type: Boolean }) loader
  @Prop({ default: '', type: String }) height
  @Prop({ default: '', type: String }) width
  @Prop({
    default: () => {
      return {
        BC: 'Average Of B.C.',
        REGION: 'Average Of Regional Districts',
        COMMUNITY: 'Average Of Communities',
      }
    },
    type: Object,
  })
  compareStates

  @commModule.Getter('getCommunities') communities
  @commModule.Getter('getRegionalDistricts') regionalDistricts

  loading = true

  get showAutoComplete() {
    return this.mode !== this.compareStates.BC
  }

  get itemText() {
    if (this.mode === this.compareStates.COMMUNITY) {
      return 'place_name'
    } else if (this.mode === this.compareStates.REGION) {
      return 'name'
    } else {
      return ''
    }
  }

  get items() {
    if (this.mode === this.compareStates.COMMUNITY) {
      return this.communities
    } else if (this.mode === this.compareStates.REGION) {
      return this.regionalDistricts
    } else {
      return []
    }
  }

  get allCids() {
    return this.communities.map((c) => c.id.toString())
  }

  get cidsEmpty() {
    return this.cids.length === 0
  }

  cids = []

  handleChange(data) {
    let cids = []
    if (this.mode === this.compareStates.COMMUNITY) {
      cids = data.map((cid) => cid.toString())
    } else if (this.mode === this.compareStates.REGION) {
      let temp = []
      data.map((rid) => {
        temp = temp.concat(
          this.communities.filter((c) => c.regional_district === rid)
        )
      })
      cids = temp.map((c) => c.id.toString())
    }
    this.cids = cids
  }

  handleSelectChange(data) {
    this.$emit('changeMode', data)
  }

  handleLoaded() {
    this.loading = false
    this.$emit('loaded')
  }
}
</script>
<style lang="scss" scoped>
.progress-compare {
  max-width: 300px;
  margin: 0 auto;
}

.compare-input-container {
  background-color: #073366;
}
</style>
