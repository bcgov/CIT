<template>
  <div class="my-5">
    <div v-if="$fetchState.pending" class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        class="my-5"
      ></v-progress-circular>
    </div>
    <div v-else-if="$fetchState.error"></div>
    <div v-else>
      <ul class="region-profile-card-list ma-0 pa-0 px-5">
        <li
          v-for="rd in regionalData.census_data"
          :key="rd.key"
          class="ma-0 pa-0 my-1"
        >
          <span class="d-inline-block font-weight-bold"
            >{{ rd.metadata.name }}:
          </span>
          <span class="d-inline-block">{{ rd.value }}{{ rd.units || '' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { getRegionalData } from '~/api/cit-api'

@Component
export default class RegionProfileCard extends Vue {
  @Prop({ default: null }) regionalDistrict

  async fetch() {
    if (!this.regionalDistrict) {
      return
    }
    const result = await getRegionalData(this.regionalDistrict)
    this.regionalData = result.data
  }

  regionalData = [
    {
      title: 'Median Income',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Population Density',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Median Age',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Employment Rate',
      value: 'N/A',
      unit: null,
    },
    {
      title: '% Population with Post-secondary Education',
      value: 'N/A',
      unit: null,
    },
    {
      title: '% Community with Broadband Access',
      value: 'N/A',
      unit: null,
    },
  ]
}
</script>
<style lang="scss" scoped>
.region-profile-card-list {
  list-style: none;
}
</style>
