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
            @changed="handleSelectChange"
          ></CompareSelect>

          <CompareAutocomplete
            v-show="showAutoComplete"
            ref="compareAutoComplete"
            :mode="mode"
            :items="items"
            item-value="id"
            :item-text="itemText"
            :multiple="true"
            class="mt-4"
            @change="handleChange"
          ></CompareAutocomplete>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="cidsEmpty">
      <v-alert type="info">
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
import { Component, Vue, namespace, Prop, Watch } from 'nuxt-property-decorator'
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
  @Prop({ default: 'All Of BC', type: String }) initMode
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: true, type: Boolean }) loader
  @Prop({ default: '', type: String }) height
  @Prop({ default: '', type: String }) width
  @commModule.Getter('getCommunities') communities
  @commModule.Getter('getRegionalDistricts') regionalDistricts

  loading = true

  get itemText() {
    if (this.mode === 'Communities') {
      return 'place_name'
    } else if (this.mode === 'Regional Districts') {
      return 'name'
    } else {
      return ''
    }
  }

  get items() {
    if (this.mode === 'Communities') {
      return this.communities
    } else if (this.mode === 'Regional Districts') {
      return this.regionalDistricts
    } else {
      return []
    }
  }

  get allCids() {
    return this.communities.map((c) => c.id.toString())
  }

  get showAutoComplete() {
    return this.mode !== 'All Of BC'
  }

  get cidsEmpty() {
    return this.cids.length === 0
  }

  cids = []

  mode = 'All Of BC'

  @Watch('mode')
  handleModeChange(mode) {
    if (mode !== 'All Of BC') {
      const compareAutoComplete = this.$refs.compareAutoComplete
      compareAutoComplete.handleUpdate()
    }
  }

  remove(item) {
    const index = this.autocomplete.indexOf(item.id)
    if (index >= 0) this.autocomplete.splice(index, 1)
  }

  handleChange(data) {
    let cids = []
    if (this.mode === 'Communities') {
      cids = data.map((cid) => cid.toString())
    } else if (this.mode === 'Regional Districts') {
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
    this.mode = data
    const compareAutoComplete = this.$refs.compareAutoComplete
    compareAutoComplete.clear()
    if (data === 'All Of BC') {
      this.cids = this.allCids
    } else {
      this.cids = []
    }
  }

  handleLoaded() {
    this.loading = false
    this.$emit('loaded')
  }

  mounted() {
    console.log('Mounted')
    const compareSelect = this.$refs.compareSelect
    const compareAutoComplete = this.$refs.compareAutoComplete
    if (this.rid) {
      compareSelect.setSelected('Regional Districts')
      compareAutoComplete.setAutoComplete([this.rid])
    }
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
