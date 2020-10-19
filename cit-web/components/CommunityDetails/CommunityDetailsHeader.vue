<template>
  <div class="elevation-5">
    <div class="d-flex align-center">
      <div class="cdh-header d-flex flex-column justify-center pl-5">
        <h6 class="text-h4 font-weight-bold">Keromeos</h6>
        <v-btn
          color="primary"
          class="mt-2 text-uppercase"
          width="150"
          @click="$emit('go')"
          >Go to Report</v-btn
        >
      </div>
      <div class="cdh-content">
        <div>
          <div>
            <a :href="`/explore?tab=Map&rid=${rid}`" class="text-body-1">
              {{ regionalDistrict || 'Region N/A' }}
            </a>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>Census Subdivision:</dt>
              <dd>{{ censusData.name || 'N/A' }}</dd>
            </dl>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>Census Subdivision Area:</dt>
              <dd>{{ getCensusValue('area', censusData) || 'N/A' }}</dd>
            </dl>
          </div>
        </div>

        <div>
          <div>
            <dl class="cdh-dl">
              <dt>Median Income:</dt>
              <dd>
                {{ getCensusValue('median_total_income', censusData) || 'N/A' }}
              </dd>
            </dl>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>Population Density:</dt>
              <dd>N/A</dd>
            </dl>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>Median Age:</dt>
              <dd>N/A</dd>
            </dl>
          </div>
        </div>

        <div>
          <div>
            <dl class="cdh-dl">
              <dt>Employment Rate:</dt>
              <dd>N/A</dd>
            </dl>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>% Population Post-Secondary Education:</dt>
              <dd>N/A</dd>
            </dl>
          </div>
          <div>
            <dl class="cdh-dl">
              <dt>% Community with Broadband Access:</dt>
              <dd>N/A</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsHeader extends Vue {
  @Prop({ default: null, type: Object }) censusData
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: null, type: String }) regionalDistrict

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
<style lang="scss" scoped>
.cdh-dl dt,
.cdh-dl dd {
  display: inline-block;
}

.cdh-dl dt {
  font-weight: bold;
}

.cdh-header {
  width: 360px;
}

.cdh-content {
  flex: 1 1 0;
  display: flex;
}

.cdh-content > div {
  flex: 1 1 0;
}
</style>
