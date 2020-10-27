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
    <v-divider class="my-4"></v-divider>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <div class="font-weight-bold">Mayor</div>
          <div>{{ censusData.name || 'N/A' }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Census Subdivision Area:</div>
          <div>{{ getCensusValue('area', censusData) || 'N/A' }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Census Subdivision:</div>
          <div>{{ censusData.name || 'N/A' }}</div>
        </v-col>
        <v-col cols="4">
          <div>Median Income:</div>
          <div>
            {{ getCensusValue('median_total_income', censusData) || 'N/A' }}
          </div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Mayor</div>
          <div>{{ censusData.name || 'N/A' }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Median Income:</div>
          <div>
            {{ getCensusValue('median_total_income', censusData) || 'N/A' }}
          </div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Population Density:</div>
          <div>{{ censusData.population_density_per_sq_km }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Average Age:</div>
          <div>{{ censusData.population_avg_age }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">Employment Rate:</div>
          <div>{{ censusData.employment_rate }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">% Post-Secondary Education:</div>
          <div>{{ censusData.edu_2 }}</div>
        </v-col>
        <v-col cols="4">
          <div class="font-weight-bold">% Fast Internet Access (50 Mbps):</div>
          <div>{{ communityDetails.percent_50_10 }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="primary"
            class="mt-2 text-uppercase"
            width="150"
            @click="$emit('go')"
            >Reports</v-btn
          >
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
    return `${group?.value || ''}${group?.units || ''}`
  }
}
</script>
