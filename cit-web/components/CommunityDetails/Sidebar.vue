<template>
  <div class="community-details-sidebar">
    <div class="pt-5 pb-5">
      <SidebarHeader :place-name="placeName">
        <h6 class="text-center">Population: {{ population || 'N/A' }}</h6>
        <div class="text-center">
          <v-btn color="primary" x-small @click="dialog = true"
            >View Raw Data
            <v-icon right dark>mdi-database</v-icon>
          </v-btn>
        </div>
      </SidebarHeader>
    </div>
    <v-divider></v-divider>

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
            height="30"
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

    <v-dialog v-model="dialog" max-width="800">
      <v-toolbar color="primary" dense elevation="3">
        <v-toolbar-title style="color: white;">{{ placeName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
      </v-toolbar>
      <v-card>
        <v-col
          v-for="(value, key) in groupedCensus"
          :key="key"
          class="mb-5"
          cols="12"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">{{
              key === 'null' ? 'Miscellaneous' : key
            }}</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item v-for="item in value" :key="item.key">
                <v-list-item-content>{{
                  item.metadata.name
                }}</v-list-item-content>
                <v-list-item-content class="align-end justify-center"
                  >{{ item.value || 'No data'
                  }}{{ item.value ? item.units : '' }}</v-list-item-content
                >
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  @Prop() population
  @Prop({ default: null, type: Array }) groupedLocations
  @Prop({ default: null, type: Object }) groupedCensus
}
</script>
