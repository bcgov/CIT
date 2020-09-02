<template>
  <div>
    <MenuFilter
      ref="menuFilter"
      :chip-title="title"
      :filter-title="'Locations'"
      :card-width="500"
      :active="active"
      @save="handleSave"
      @clear="handleClear"
    >
      <LocationInputs></LocationInputs>
    </MenuFilter>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import LocationInputs from '~/components/Explore/Filters/LocationInputs.vue'
@Component({
  LocationInputs,
})
export default class Locations extends Vue {
  title = 'Locations'
  active = false
}
</script>
