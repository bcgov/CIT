<template>
  <div>
    <div class="d-flex align-center">
      <div class="cdh-header d-flex flex-column justify-center">
        <h6 class="text-h3 font-weight-bold">
          {{ placeName }}
        </h6>

        <a :href="`/explore?&rid=${rid}`" class="text-h6 d-block mt-2">
          {{ regionalDistrict || 'Region N/A' }}
        </a>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <v-divider class="my-4"></v-divider>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Mayor</div>
          <div>{{ communityDetails.mayor || 'N/A' }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Census Subdivision Area:</div>
          <div>{{ getCensusValue('area', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Census Subdivision:</div>
          <div>{{ censusData.name || 'N/A' }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Median Income:</div>
          <div>
            {{ getCensusValue('median_total_income', censusData) }}
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Population Density:</div>
          <div>
            {{ getCensusValue('population_density_per_sq_km', censusData) }}
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Average Age:</div>
          <div>{{ getCensusValue('population_avg_age', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">Employment Rate:</div>
          <div>{{ getCensusValue('employment_rate', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">% Post-Secondary Education:</div>
          <div>{{ getCensusValue('pct_post_secondary', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="font-weight-bold">% Fast Internet Access (50 Mbps):</div>
          <div>{{ getCDValue('percent_50_10', communityDetails) }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="primary"
            class="mt-6 text-uppercase"
            width="150"
            @click="$emit('go')"
          >
            <v-icon class="mr-2">mdi-file-document</v-icon>Reports
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsHeader extends Vue {
  @Prop({ default: null, type: Object }) censusData
  @Prop({ default: null, type: Object }) communityDetails
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: null, type: String }) regionalDistrict
  @Prop({ default: null, type: String }) placeName

  pick = {
    name: true,
    area: true,
  }

  get filteredData() {
    if (!this.censusData) {
      return null
    } else {
      return this.censusData.groups?.filter((g) => {
        return this.pick[g.key]
      })
    }
  }

  getCensusValue(key, data) {
    const groups = data.groups
    const group = groups?.find((g) => g.key === key)
    if (group?.value !== 0 && !group?.value) {
      return 'N/A'
    }
    return `${group?.value || ''}${group?.units || ''}`
  }

  getCDValue(key, data) {
    const dfs = data.display_fields
    const df = dfs.find((df) => df.key === key)
    if (!df && df.value !== 0) {
      return 'N/A'
    }
    return df && `${df.value}${df.units || ''}`
  }

  updated() {
    console.log(this.censusData)
    console.log('Comm details', this.communityDetails)
  }
}
</script>
