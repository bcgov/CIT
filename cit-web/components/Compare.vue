<template>
  <div>
    <CompareAutocomplete
      :items="communities"
      item-value="id"
      item-text="place_name"
      :multiple="true"
      @change="handleChange"
    ></CompareAutocomplete>

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
import Report from '~/components/CommunityDetails/Report'
const commModule = namespace('communities')
@Component({
  CompareAutocomplete,
  Report,
})
export default class Compare extends Vue {
  @commModule.Getter('getCommunities') communities
  @commModule.Getter('getRegionalDistricts') regionalDistricts
  autocomplete = []
  loading = true
  /*
  get cids() {
    return this.communities.map((c) => c.id.toString())
  }
  */

  cids = []

  remove(item) {
    const index = this.autocomplete.indexOf(item.id)
    if (index >= 0) this.autocomplete.splice(index, 1)
  }

  handleChange(data) {
    const cids = data.map((cid) => cid.toString())
    this.cids = cids
  }
}
</script>
<style lang="scss" scoped>
.progress-compare {
  max-width: 300px;
  margin: 0 auto;
}
</style>
