<template>
  <div>
    <div class="location-input-container d-flex mt-2">
      <div>
        <v-select
          v-model="location"
          class="ml-2 mr-5"
          dense
          hide-details
          :items="locationTypes"
          item-text="title"
          item-value="title"
          label="Location"
          placeholder="eg. Schools"
          return-object
        ></v-select>
      </div>
      <div class="operator-container">
        <v-select
          v-model="operator"
          dense
          hide-details
          :items="operatorTypes"
          item-text="title"
          item-value="title"
          label="Operator"
          placeholder="eg. (>)"
          return-object
        ></v-select>
      </div>
      <div>
        <v-combobox
          v-model="distance"
          class="ml-5 mr-2"
          dense
          hide-details
          :items="suggestedDistance"
          item-text="title"
          item-value="title"
          label="Distance (km)"
          placeholder="eg. 10km"
          @update:search-input="handleComboBox"
        ></v-combobox>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LocationInputs extends Vue {
  location = null
  distance = null
  operator = null

  handleComboBox(e) {
    if (!e && e !== 0) {
      this.distance = null
    }
    this.distance = e
  }

  operatorTypes = [
    {
      value: 'gte',
      title: '>',
    },
    {
      value: 'lte',
      title: '<',
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
  ]

  suggestedDistance = [5, 10, 15, 20, 25]

  getParams() {
    if (!this.isValid()) {
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

  isValid() {
    return (
      this.location !== null && this.distance !== null && this.operator !== null
    )
  }
}
</script>
<style lang="scss" scoped>
.location-input-container div {
  flex: 1 1 0;
}

.location-input-container > .operator-container {
  flex: 0.25 1 0;
}
</style>
