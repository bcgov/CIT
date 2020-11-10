<template>
  <div>
    <v-pagination v-model="page" :length="length" circle></v-pagination>
    <div v-for="location in pageLocations" :key="location.id">
      <LocationCard
        :location="location"
        :type="type"
        class="my-1"
      ></LocationCard>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class PaginatedList extends Vue {
  @Prop({ default: null, type: Array }) locations
  @Prop({ default: null, type: String }) type

  page = 1
  itemsPerPage = 10

  get pageLocations() {
    if (this.page === 1) {
      return this.locations.slice(0, this.itemsPerPage)
    }
    const temp = this.page * this.itemsPerPage
    return this.locations.slice(temp - this.itemsPerPage, temp)
  }

  get length() {
    return Math.floor(this.locations.length / 10)
  }
}
</script>
