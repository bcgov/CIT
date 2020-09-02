<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Locations'"
      :card-width="500"
      :active="active"
      @clear="handleClear"
      @save="handleSave"
    >
      <div v-for="(lf, index) in locationFilters" :key="lf">
        <div class="mt-5 mb-5 d-flex">
          <LocationInputs ref="locationInputs"></LocationInputs>
          <v-btn
            v-if="locationFilters.length > 1"
            color="primary"
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
        <v-btn color="primary" fab small icon @click="addLocation">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import uid from 'uid'
import isEmpty from 'lodash/isEmpty'
import LocationInputs from '~/components/Explore/Filters/LocationInputs.vue'
@Component({
  LocationInputs,
})
export default class Locations extends Vue {
  title = 'Locations'
  active = false

  locationFilters = [uid()]
  addLocation() {
    this.locationFilters.push(uid())
  }

  handleClear() {
    this.locationFilters = [uid()]
  }

  handleSave() {
    this.$refs.menuFilter.hide()
    const locationParams = this.getParams().filter((lp) => !isEmpty(lp))
    if (locationParams.length === 0) {
      this.title = 'Locations'
      this.active = false
      return
    }
    if (locationParams.length === 1) {
      const locationInputs = this.$refs.locationInputs
      const locationInput = locationInputs.find((li) => li.isValid())
      this.title = locationInput.getText()
    } else {
      this.title = '2 Location Constraints'
    }
    this.active = true
    this.$emit('filter')
  }

  getParams() {
    const locationInputs = this.$refs.locationInputs
    const locationParams = []
    locationInputs.map((li) => {
      locationParams.push(li.getParams())
    })
    return locationParams
  }
}
</script>
