<template>
  <div class="community-details-sidebar">
    <div class="pt-4 pb-4">
      <SidebarHeader :place-name="placeName">
        <p class="mt-0 text-center">{{ district }}</p>
        <p v-if="population" class="text-center text-caption">
          Population: {{ population || 'N/A' }}
        </p>
        <div class="d-flex justify-center">
          <v-btn
            color="primary"
            x-small
            class="mt-5"
            @click="$emit('viewReports')"
            >View Reports
          </v-btn>
        </div>
      </SidebarHeader>
    </div>
    <p class="text-center">
      Facilities within
      <a href="/footnotes#search-filters-distance" target="_blank">50km drive</a
      >:
    </p>
    <v-list dense nav>
      <v-list-group
        v-for="groupedLocation in groupedLocations"
        :key="groupedLocation.group"
        v-model.lazy="groupedLocation.active"
        no-action
        @click="$emit('expand', groupedLocation)"
      >
        <template v-slot:activator>
          <img
            height="18"
            width="18"
            :src="require(`~/assets/icons/${groupedLocation.group}.svg`)"
            alt="Civic Facilities"
            class="mr-2"
          />
          <v-list-item-content>
            <v-list-item-title>
              {{ startCase(groupedLocation.group) }}
            </v-list-item-title>
          </v-list-item-content>

          <v-chip x-small class="font-weight-bold ma-0 ml-0">
            {{ groupedLocation.locations.length }}
          </v-chip>
        </template>

        <div
          v-for="location in groupedLocation.locations"
          :key="location.id"
          class="pa-2"
        >
          <LocationCard
            :location="location"
            :type="groupedLocation.group"
          ></LocationCard>
        </div>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import startCase from 'lodash/startCase'
import SidebarHeader from '~/components/CommunityDetails/SidebarHeader.vue'

@Component({
  SidebarHeader,
  methods: {
    startCase,
  },
})
export default class MainReport extends Vue {
  dialog = false

  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: String }) district
  @Prop() population
  @Prop({ default: null, type: Array }) groupedLocations
  @Prop({ default: null, type: Object }) groupedCensus
}
</script>
