<template>
  <div>
    <div class="location-input-container d-flex mt-2">
      {{ location }}
      {{ operator }}
      {{ distance }}
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

  operatorTypes = [
    {
      title: '>',
    },
    {
      title: '<',
    },
  ]

  locationTypes = [
    {
      title: 'Schools',
    },
    {
      title: 'Hospitals',
    },
  ]

  suggestedDistance = [
    {
      title: '5',
    },
    {
      title: '10',
    },
    {
      title: '15',
    },
    {
      title: '20',
    },
    {
      title: '25',
    },
    {
      title: '50',
    },
  ]
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
