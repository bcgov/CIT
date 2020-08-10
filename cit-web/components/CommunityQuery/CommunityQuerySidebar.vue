<template>
  <div>
    <!-- TODO SY - get fields and value from API -->
    <v-form>
      <div>
        <span>Community Type</span>
        <v-checkbox
          v-model="communityType"
          value="Indigenous"
          label="Indigenous"
        ></v-checkbox>
        <v-checkbox
          v-model="communityType"
          value="Rural"
          label="Rural"
        ></v-checkbox>
        <v-checkbox
          v-model="communityType"
          value="Urban"
          label="Urban"
        ></v-checkbox>
      </div>

      <div>
        <span>Estimated Population</span>
        <!-- TODO -->
        <div>[TODO] slider</div>
      </div>

      <div>
        <span>Population Growth</span>
        <v-checkbox
          v-model="populationGrowth"
          value="Shrinking"
          label="Shrinking"
        ></v-checkbox>
        <v-checkbox
          v-model="populationGrowth"
          value="No Change"
          label="No Change"
        ></v-checkbox>
        <v-checkbox
          v-model="populationGrowth"
          value="Growing"
          label="Growing (<25%)"
        ></v-checkbox>
        <v-checkbox
          v-model="populationGrowth"
          value="Rapid"
          label="Rapid Grown (>25%)"
        ></v-checkbox>
      </div>

      <div>
        <span>Has Any K-12 School</span>
        <v-radio-group v-model="hasK12">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Has Any Post Secondary</span>
        <v-radio-group v-model="hasPostSecondary">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Has Clinics</span>
        <v-radio-group v-model="hasClinics">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Has Hospitals</span>
        <v-radio-group v-model="hasHospitals">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Has 50Mbps Access</span>
        <v-radio-group v-model="has50Mbps">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Has Mills</span>
        <v-radio-group v-model="hasMills">
          <v-radio label="No" value="no"></v-radio>
          <v-radio label="Yes" value="yes"></v-radio>
        </v-radio-group>
      </div>

      <div>
        <span>Wildfire Zone</span>
        <v-checkbox
          v-model="wildfireZone"
          value="1"
          label="1 (low)"
        ></v-checkbox>
        <v-checkbox v-model="wildfireZone" value="2" label="2 ()"></v-checkbox>
        <v-checkbox v-model="wildfireZone" value="3" label="3 ()"></v-checkbox>
        <v-checkbox v-model="wildfireZone" value="4" label="4 ()"></v-checkbox>
        <v-checkbox
          v-model="wildfireZone"
          value="5"
          label="5 (extreme)"
        ></v-checkbox>
        <v-checkbox
          v-model="wildfireZone"
          value=""
          label="No data"
        ></v-checkbox>
      </div>

      <div>
        <span>Tsunami Zone</span>
        <v-checkbox
          v-model="tsunamiZone"
          value="a"
          label="A (moderate)"
        ></v-checkbox>
        <v-checkbox
          v-model="tsunamiZone"
          value="b"
          label="B (moderate)"
        ></v-checkbox>
        <v-checkbox
          v-model="tsunamiZone"
          value="c"
          label="C (moderate)"
        ></v-checkbox>
        <v-checkbox
          v-model="tsunamiZone"
          value="d"
          label="D (low)"
        ></v-checkbox>
        <v-checkbox
          v-model="tsunamiZone"
          value="e"
          label="E (low)"
        ></v-checkbox>
        <v-checkbox v-model="tsunamiZone" value="" label="No data"></v-checkbox>
      </div>
    </v-form>
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
      hasK12: undefined,
      hasPostSecondary: undefined,
      hasClinics: undefined,
      hasHospitals: undefined,
      has50Mbps: undefined,
      hasMills: undefined,
      wildfireZone: undefined,
      tsunamiZone: undefined,
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
