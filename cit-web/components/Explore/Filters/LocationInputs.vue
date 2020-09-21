<template>
  <div>
    <v-form ref="locationForm">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col sm="6">
            <div>
              <v-select
                v-model="location"
                dense
                :items="locationTypes"
                :rules="requiredRule"
                item-text="title"
                item-value="title"
                label="Location"
                placeholder="eg. Schools"
                return-object
                required
              ></v-select>
            </div>
          </v-col>
          <v-col sm="3">
            <div class="operator-container">
              <v-select
                v-model="operator"
                class="ml-2 mr-2"
                dense
                :items="operatorTypes"
                :rules="requiredRule"
                item-text="title"
                item-value="title"
                label="Constraint"
                placeholder="eg. (>)"
                return-object
                required
              ></v-select>
            </div>
          </v-col>
          <v-col sm="3">
            <div>
              <v-combobox
                v-model="distance"
                dense
                :items="suggestedDistance"
                :rules="requiredRule"
                item-text="title"
                item-value="title"
                label="Distance (km)"
                placeholder="eg. 10km"
                required
                @update:search-input="handleComboBox"
              ></v-combobox>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LocationInputs extends Vue {
  location = null
  distance = 50
  operator = { value: 'lte', title: 'within' }
  requiredRule = [(v) => !!v || 'This is required']

  handleComboBox(e) {
    if (!e && e !== 0) {
      this.distance = null
    }
    this.distance = e
  }

  operatorTypes = [
    {
      value: 'xgt',
      title: 'not within',
    },
    {
      value: 'lte',
      title: 'within',
    },
  ]

  locationTypes = [
    {
      value: 'schools',
      title: 'Schools',
    },
    {
      value: 'hospitals',
      title: 'Hospitals',
    },
    {
      value: 'clinics',
      title: 'Clinics',
    },
    {
      value: 'civic_facilities',
      title: 'Civic Facilities',
    },
    {
      value: 'diagnostic_facilities',
      title: 'Diagnostic Facilities',
    },
    {
      value: 'natural_resource_projects',
      title: 'Natural Resource Projects',
    },
    {
      value: 'economic_projects',
      title: 'Economic Projects',
    },
    {
      value: 'servicebc_locations',
      title: 'ServiceBC Locations',
    },
    {
      value: 'economic_projects',
      title: 'Economic Projects',
    },
    {
      value: 'post_secondary_institutions',
      title: 'Post Secondary',
    },
    {
      value: 'courts',
      title: 'Courts',
    },
    {
      value: 'closed_mills',
      title: 'Closed Mills',
    },
    {
      value: 'airports',
      title: 'Airports',
    },
  ]

  suggestedDistance = [5, 10, 15, 20, 25]

  getParams() {
    if (!this.isValid) {
      return {}
    }
    const temp = {}
    const prop = `location__${this.location.value}__${this.operator.value}__km`
    temp[prop] = this.distance
    return temp
  }

  getText() {
    return `${this.location.title} ${this.operator.title} ${this.distance}km`
  }

  get isValid() {
    return (
      this.location !== null && this.distance !== null && this.operator !== null
    )
  }

  validateLocations() {
    this.$refs.locationForm.validate()
  }
}
</script>
