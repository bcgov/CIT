<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Local Assets'"
      :card-width="600"
      :active="active"
      :disabled="disabled"
      @clear="handleClear"
      @save="handleSave"
    >
      <p class="text-body-1">
        Search by what's nearby, choose an asset.
        <a href="/footnotes#search-filters-distance" target="_blank"
          >How does it work?</a
        >
      </p>
      <div v-for="(lf, index) in locationFilters" :key="lf">
        <div class="mt-5 mb-5 d-flex">
          <LocationInputs ref="locationInputs"></LocationInputs>
          <v-btn
            v-if="locationFilters.length > 1"
            color="red darken-1"
            fab
            small
            icon
            @click="locationFilters.splice(index, 1)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="d-flex mt-5">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          small
          text
          class="text-body-1 font-weight-medium"
          @click="addLocation"
        >
          <v-icon small class="mr-2">mdi-plus</v-icon>
          Add More
        </v-btn>
      </div>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import uid from 'uid'
import isEmpty from 'lodash/isEmpty'
import LocationInputs from '~/components/Explore/Filters/LocationInputs.vue'
@Component({
  LocationInputs,
})
export default class Locations extends Vue {
  @Prop({ default: false, type: Boolean }) disabled

  title = 'Local Assets'
  active = false
  locationFilters = [uid()]

  reset() {
    this.title = 'Local Assets'
    this.active = false
    this.locationFilters = [uid()]
  }

  addLocation() {
    this.locationFilters.push(uid())
  }

  handleClear() {
    this.locationFilters = [uid()]
  }

  validateInputs() {
    const { locationInputs } = this.$refs
    let counter = 0
    locationInputs.map((li) => {
      li.validateLocations()
      if (li.isValid === false) {
        counter++
      }
    })
    return counter
  }

  handleSave() {
    console.log(this.locationFilters.length)
    if (this.locationFilters.length > 1) {
      const invalidInputs = this.validateInputs()
      if (invalidInputs > 0) {
        return
      }
    }

    this.$refs.menuFilter.hide()
    const locationParams = this.getParams().filter((lp) => !isEmpty(lp))
    if (locationParams.length === 0) {
      this.title = 'Local Assets'
      this.active = false
    } else if (locationParams.length === 1) {
      const locationInputs = this.$refs.locationInputs
      const locationInput = locationInputs.find((li) => li.isValid)
      this.title = locationInput.getText()
      this.active = true
    } else {
      this.title = `${locationParams.length} Location Constraints`
      this.active = true
    }

    this.$emit('filter')
  }

  getParams() {
    const locationInputs = this.$refs.locationInputs
    if (!locationInputs) {
      return []
    }
    const locationParams = []
    locationInputs.map((li) => {
      locationParams.push(li.getParams())
    })
    return locationParams
  }
}
</script>
