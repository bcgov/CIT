<template>
  <div>
    <h5 class="text-h6 mb-2">Selection Results:</h5>
    <p>
      This list of communities and regional districts match the criteria
      selected above.
    </p>

    <div v-if="loadingResults" class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        class="my-5"
      ></v-progress-circular>
    </div>
    <div>
      <div class="d-flex justify-space-between pl-5 pr-5">
        <div class="d-flex flex-column">
          <div class="text-h4 font-weight-bold" style="color: #f8ba44;">
            {{ numRegions }}
          </div>
          <div>Regional Districts</div>
        </div>
        <div class="d-flex flex-column">
          <div class="text-h4 font-weight-bold" style="color: #2176d2;">
            {{ numCommunities && numCommunities.toLocaleString() }}
          </div>
          <div>Communities</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ExploreFilterHeader extends Vue {
  @Prop({ default: false, Type: Boolean }) loadingResults
  @Prop({ default: null, Type: String }) numRegions
  @Prop({ default: null, Type: String }) numCommunities
}
</script>
