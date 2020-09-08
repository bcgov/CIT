<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col :cols="selectCols">
          <CompareSelect @changed="handleSelectChange"></CompareSelect>
        </v-col>
        <v-col v-if="showAutoComplete" cols="9">
          <CompareAutocomplete
            :items="items"
            item-value="id"
            :item-text="itemText"
            :multiple="true"
            @change="handleChange"
          ></CompareAutocomplete>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="loading">
      <h6 class="text-h6 text-center mt-10 mb-10">Generating your report</h6>
      <div class="progress-compare">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>
    </div>
    <div v-show="!loading">
      <Report
        page-name="ReportSection6249eac6d911d2930de3"
        :cids="cids"
        extra-classname="demographics"
        @loaded="loading = false"
      ></Report>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator'
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

  get selectCols() {
    return this.mode === 'All Of BC' ? 12 : 3
  }

  get showAutoComplete() {
    return this.mode !== 'All Of BC'
  }

  cids = []

  mode = 'All Of BC'

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
    if (data === 'All Of BC') {
      this.cids = this.allCids
    } else {
      this.cids = []
    }
  }
}
</script>
<style lang="scss" scoped>
.progress-compare {
  max-width: 300px;
  margin: 0 auto;
}
</style>
