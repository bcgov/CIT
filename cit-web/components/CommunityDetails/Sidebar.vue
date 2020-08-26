<template>
  <div class="community-details-sidebar">
    <div class="pt-5 pb-5">
      <SidebarHeader :place-name="placeName">
        <h6 class="text-center">Population: {{ population }}</h6>
        <div class="text-center">
          <v-btn color="primary" x-small @click="dialog = true"
            >View Raw Data
            <v-icon right dark>mdi-database</v-icon>
          </v-btn>
        </div>
      </SidebarHeader>
    </div>
    <v-divider></v-divider>

    <v-list dense nav class="ma-0">
      <v-list-group :v-model="true" :prepend-icon="'mdi-map'" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              Layers
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item-content>
          <div class="d-flex align-center mt-0">
            <h5 class="ml-3">Schools</h5>
            <v-spacer></v-spacer>
            <v-switch
              class="mt-0"
              hide-details
              dense
              :v-model="true"
            ></v-switch>
          </div>
          <div class="d-flex align-center mt-0">
            <h5 class="ml-3">Hospitals</h5>
            <v-spacer></v-spacer>
            <v-switch
              class="mt-0"
              hide-details
              dense
              :v-model="true"
            ></v-switch>
          </div>
        </v-list-item-content>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-group
        v-for="groupedLocation in groupedLocations"
        :key="groupedLocation.group"
        v-model.lazy="groupedLocation.active"
        :prepend-icon="getLocationMetaData(groupedLocation.group).icon"
        no-action
        @click="$emit('expand', groupedLocation)"
      >
        <template v-slot:activator>
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
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) population
  @Prop({ default: null, type: Array }) groupedLocations

  getLocationMetaData(location) {
    const metaData = {
      schools: {
        icon: 'mdi-school',
      },
      hospitals: {
        icon: 'mdi-hospital-box',
      },
    }

    if (!metaData[location]) {
      return {
        icon: 'mdi-school',
      }
    }
    return metaData[location]
  }
}
</script>
