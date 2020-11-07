<template>
  <div>
    <v-container
      fluid
      style="height: 180px;"
      class="compare-input-container align-center d-flex"
    >
      <v-row>
        <v-col sm="12">
          <CompareSelect
            ref="compareSelect"
            :value="selectionMode"
            :selections="Object.values(compareStates)"
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
            :value="selected"
            @update="handleUpdate"
          ></CompareAutocomplete>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="cidsEmpty">
      <v-alert type="info" class="primary--text elevation-5">
        Please select a community, regional district or All of B.C.
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
const compareStore = namespace('compare')

@Component({
  CompareAutocomplete,
  Report,
  CompareSelect,
})
export default class Compare extends Vue {
  @Prop({ default: 'ReportSection6249eac6d911d2930de3', type: String }) pid
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
  @compareStore.Mutation('setCompare') setCompare

  loading = true
  selectionMode = 'Average Of Regional Districts'
  selected = []

  handleUpdate(data) {
    this.selected = data
  }

  mounted() {
    this.setInitialRegion()
  }

  get selectedNames() {
    return this.selected.map((s) => s[this.itemText])
  }

  @Watch('selectedNames')
  setCompare

  @Watch('selectionMode')
  handleModeChange() {
    this.selected = []
    this.setInitialRegion()
  }

  setInitialRegion() {
    if (this.rid && this.selectionMode === this.compareStates.REGION) {
      const rd = this.regionalDistricts.find((rd) => rd.id === this.rid)
      if (rd) {
        this.selected = [rd]
      }
    }
  }

  get showAutoComplete() {
    return this.selectionMode !== this.compareStates.BC
  }

  get itemText() {
    if (this.selectionMode === this.compareStates.COMMUNITY) {
      return 'place_name'
    } else if (this.selectionMode === this.compareStates.REGION) {
      return 'name'
    } else {
      return ''
    }
  }

  get items() {
    if (this.selectionMode === this.compareStates.COMMUNITY) {
      return this.communities
    } else if (this.selectionMode === this.compareStates.REGION) {
      return this.regionalDistricts
    } else {
      return []
    }
  }

  get allCids() {
    return this.communities.map((c) => c.id.toString())
  }

  get cidsEmpty() {
    return this.cids?.length === 0
  }

  get cids() {
    if (this.selectionMode === this.compareStates.BC) {
      return this.allCids
    } else if (this.selectionMode === this.compareStates.REGION) {
      let temp = []
      this.selected.map((rd) => {
        temp = temp.concat(
          this.communities.filter((c) => c.regional_district === rd.id)
        )
      })
      return temp.map((c) => c.id.toString())
    } else {
      return this.selected.map((cid) => cid.id.toString())
    }
  }

  handleSelectChange(data) {
    this.selectionMode = data
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
