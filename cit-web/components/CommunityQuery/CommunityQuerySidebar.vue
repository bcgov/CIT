<template>
  <div>
    <!-- TODO SY - get fields and value from API -->
    <form>
      <div class="field-group">
        <strong>Community Type</strong>
        <div>
          <input
            id="communityTypeIndigenous"
            v-model="communityType"
            type="checkbox"
            value="Indigenous"
          />
          <label for="communityTypeIndigenous">Indigenous</label>
        </div>
        <div>
          <input
            id="communityTypeRural"
            v-model="communityType"
            type="checkbox"
            value="Rural"
          />
          <label for="communityTypeRural">Rural</label>
        </div>
        <div>
          <input
            id="communityTypeUrban"
            v-model="communityType"
            type="checkbox"
            value="Urban"
          />
          <label for="communityTypeUrban">Urban</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Estimated Population</strong>
        <!-- TODO -->
        <div>[TODO] slider</div>
      </div>

      <div class="field-group">
        <strong>Population Growth</strong>
        <div>
          <input
            id="populationGrowthShrinking"
            v-model="populationGrowth"
            type="checkbox"
            value="Shrinking"
          />
          <label for="populationGrowthShrinking">Shrinking</label>
        </div>
        <div>
          <input
            id="populationGrowthNoChange"
            v-model="populationGrowth"
            type="checkbox"
            value="No Change"
          />
          <label for="populationGrowthNoChange">No Change</label>
        </div>
        <div>
          <input
            id="populationGrowthGrowing"
            v-model="populationGrowth"
            type="checkbox"
            value="Growing (&lt;25%)"
          />
          <label for="populationGrowthGrowing">Growing (&lt;25%)</label>
        </div>
        <div>
          <input
            id="populationGrowthRapid"
            v-model="populationGrowth"
            type="checkbox"
            value="Rapid Growth(&gt;25%)"
          />
          <label for="populationGrowthRapid">Rapid Growth (&gt;25%)</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has Any K-12 School</strong>
        <div>
          <input id="hasK12No" v-model="hasK12" type="checkbox" value="No" />
          <label for="hasK12No">No</label>
        </div>
        <div>
          <input id="hasK12Yes" v-model="hasK12" type="checkbox" value="Yes" />
          <label for="hasK12Yes">Yes</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has Any Post Secondary</strong>
        <div>
          <input
            id="hasPostSecondaryNo"
            v-model="hasPostSecondary"
            type="checkbox"
            value="No"
          />
          <label for="hasPostSecondaryNo">No</label>
        </div>
        <div>
          <input
            id="hasPostSecondaryYes"
            v-model="hasPostSecondary"
            type="checkbox"
            value="Yes"
          />
          <label for="hasPostSecondaryYes">Yes</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has Clinics</strong>
        <div>
          <input
            id="hasClinicsNo"
            v-model="hasClinics"
            type="checkbox"
            value="No"
          />
          <label for="hasClinicsNo">No</label>
        </div>
        <div>
          <input
            id="hasClinicsYes"
            v-model="hasClinics"
            type="checkbox"
            value="Yes"
          />
          <label for="hasClinicsYes">Yes</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has Hospitals</strong>
        <div>
          <input
            id="hasHospitalsNo"
            v-model="hasHospitals"
            type="checkbox"
            value="No"
          />
          <label for="hasHospitalsNo">No</label>
        </div>
        <div>
          <input
            id="hasHospitalsYes"
            v-model="hasHospitals"
            type="checkbox"
            value="Yes"
          />
          <label for="hasHospitalsYes">Yes</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has 50Mbps Access</strong>
        <div>
          <input
            id="has50Mbps5010"
            v-model="has50Mbps"
            type="checkbox"
            value="50/10 75+% Availability"
          />
          <label for="has50Mbps5010">50/10 75+% Availability</label>
        </div>
        <div>
          <input
            id="has50Mbps255"
            v-model="has50Mbps"
            type="checkbox"
            value="25/5 75+% Availability"
          />
          <label for="has50Mbps255">25/5 75+% Availability</label>
        </div>
        <div>
          <input
            id="has50MbpsLow"
            v-model="has50Mbps"
            type="checkbox"
            value="Low/No Availability"
          />
          <label for="has50MbpsLow">Low/No Availability</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Has Mills</strong>
        <div>
          <input
            id="hasMillsNo"
            v-model="hasMills"
            type="checkbox"
            value="No"
          />
          <label for="hasMillsNo">No</label>
        </div>
        <div>
          <input
            id="hasMillsYes"
            v-model="hasMills"
            type="checkbox"
            value="Yes"
          />
          <label for="hasMillsYes">Yes</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Wildfire Zone</strong>
        <div>
          <input
            id="wildfireZone1"
            v-model="wildfireZone"
            type="checkbox"
            value="1 (very low)"
          />
          <label for="wildfireZone1">1 (low)</label>
        </div>
        <div>
          <input
            id="wildfireZone2"
            v-model="wildfireZone"
            type="checkbox"
            value="2 (low)"
          />
          <label for="wildfireZone2">2</label>
        </div>
        <div>
          <input
            id="wildfireZone3"
            v-model="wildfireZone"
            type="checkbox"
            value="3"
          />
          <label for="wildfireZone3">3</label>
        </div>
        <div>
          <input
            id="wildfireZone4"
            v-model="wildfireZone"
            type="checkbox"
            value="4"
          />
          <label for="wildfireZone4">4</label>
        </div>
        <div>
          <input
            id="wildfireZone5"
            v-model="wildfireZone"
            type="checkbox"
            value="5 (extreme)"
          />
          <label for="wildfireZone5">5 (extreme)</label>
        </div>
        <div>
          <input
            id="wildfireZoneNone"
            v-model="wildfireZone"
            type="checkbox"
            value="None"
          />
          <label for="wildfireZoneNone">No data</label>
        </div>
      </div>

      <div class="field-group">
        <strong>Tsunami Zone</strong>
        <div>
          <input
            id="tsunamiZoneA"
            v-model="tsunamiZone"
            type="checkbox"
            value="A (moderate)"
          />
          <label for="tsunamiZoneNone">A (moderate)</label>
        </div>
        <div>
          <input
            id="tsunamiZoneB"
            v-model="tsunamiZone"
            type="checkbox"
            value="B (moderate)"
          />
          <label for="tsunamiZoneB">B (moderate)</label>
        </div>
        <div>
          <input
            id="tsunamiZoneC"
            v-model="tsunamiZone"
            type="checkbox"
            value="C (moderate)"
          />
          <label for="tsunamiZoneC">C (moderate)</label>
        </div>
        <div>
          <input
            id="tsunamiZoneD"
            v-model="tsunamiZone"
            type="checkbox"
            value="D (low)"
          />
          <label for="tsunamiZoneD">D (low)</label>
        </div>
        <div>
          <input
            id="tsunamiZoneE"
            v-model="tsunamiZone"
            type="checkbox"
            value="E (low)"
          />
          <label for="tsunamiZoneE">E (low)</label>
        </div>
        <div>
          <input
            id="tsunamiZoneNone"
            v-model="tsunamiZone"
            type="checkbox"
            value="None"
          />
          <label for="tsunamiZoneNone">No data</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Component, Vue, Watch, Emit } from 'nuxt-property-decorator'

@Component
export default class CommunityQuerySidebar extends Vue {
  data() {
    return {
      communityType: [],
      populationGrowth: [],
      hasK12: [],
      hasPostSecondary: [],
      hasClinics: [],
      hasHospitals: [],
      has50Mbps: [],
      hasMills: [],
      wildfireZone: [],
      tsunamiZone: [],
    }
  }

  @Watch('communityType') onCommunityTypeChanged() {
    this.updateFilters()
  }

  @Watch('populationGrowth') onPopulationGrowthChanged() {
    this.updateFilters()
  }

  @Watch('hasK12') onHasK12Changed() {
    this.updateFilters()
  }

  @Watch('hasPostSecondary') onHasPostSecondaryChanged() {
    this.updateFilters()
  }

  @Watch('hasClinics') onHasClinicsChanged() {
    this.updateFilters()
  }

  @Watch('hasHospitals') onHasHospitalsChanged() {
    this.updateFilters()
  }

  @Watch('has50Mbps') onHas50MbpsChanged() {
    this.updateFilters()
  }

  @Watch('hasMills') onHasMillsChanged() {
    this.updateFilters()
  }

  @Watch('wildfireZone') onWildfireZoneChanged() {
    this.updateFilters()
  }

  @Watch('tsunamiZone') onTsunamiZoneChanged() {
    this.updateFilters()
  }

  @Emit()
  updateFilters() {
    return {
      communityType: this.communityType,
      populationGrowth: this.populationGrowth,
      hasK12: this.hasK12,
      hasPostSecondary: this.hasPostSecondary,
      hasClinics: this.hasClinics,
      hasHospitals: this.hasHospitals,
      has50Mbps: this.has50Mbps,
      hasMills: this.hasMills,
      wildfireZone: this.wildfireZone,
      tsunamiZone: this.tsunamiZone,
    }
  }
}
</script>
<style lang="scss" scoped>
.field-group {
  margin-bottom: 1rem;
}
</style>
