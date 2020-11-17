<template>
  <div>
    <div class="d-flex align-center">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="8" xl="8">
            <div class="cdh-header d-flex flex-column justify-center">
              <h6 class="text-h3 font-weight-bold">
                {{ placeName }}
              </h6>

              <a :href="`/explore?&rid=${rid}`" class="text-h6 d-block mt-2">
                {{ regionalDistrict || 'Region N/A' }}
              </a>

              <div v-if="description" class="d-flex py-5">
                <p>
                  {{ description }}
                </p>
              </div>
            </div>
          </v-col>
          <v-col v-if="image" cols="12" sm="12" md="12" lg="4" xl="4">
            <v-img :src="image" contain max-height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <slot></slot>
    </div>
    <v-divider class="my-4"></v-divider>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Mayor</div>
          <div>{{ communityDetails.mayor || 'N/A' }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Census Subdivision Area:</div>
          <div>{{ getCensusValue('area', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Census Subdivision:</div>
          <div>{{ censusData.name || 'N/A' }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Median Income:</div>
          <div>
            {{ getCensusValue('median_total_income', censusData) }}
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Population Density:</div>
          <div>
            {{ getCensusValue('population_density_per_sq_km', censusData) }}
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Average Age:</div>
          <div>{{ getCensusValue('population_avg_age', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">Employment Rate:</div>
          <div>{{ getCensusValue('employment_rate', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">% Post-Secondary Education:</div>
          <div>{{ getCensusValue('pct_post_secondary', censusData) }}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold">% Fast Internet Access (50 Mbps):</div>
          <div>{{ getCDValue('percent_50_10', communityDetails) }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn
            height="44"
            color="primary"
            class="text-capitalize mt-2 text-body-1"
            @click="$emit('go')"
          >
            <v-icon class="mr-1">mdi-file-document</v-icon>Reports
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

  get image() {
    return this.communityDetails.header_image
  }

  get description() {
    return this.communityDetails.description
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
}
</script>
