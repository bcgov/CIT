<template>
  <div class="community-details-sidebar">
    <slot></slot>
    <v-list dense nav class="mt-3">
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
            :alt="groupedLocation.group"
            class="mr-2"
          />
          <v-list-item-content>
            <v-list-item-title class="text-body-1 py-1">
              {{
                startCase(
                  groupedLocation.group.replace('servicebc', 'Service BC')
                )
              }}
            </v-list-item-title>
          </v-list-item-content>

          <v-chip small class="font-weight-medium ma-0 ml-0 text-body-1">
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
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: null, type: String }) district
  @Prop() population
  @Prop({ default: null, type: Array }) groupedLocations
  @Prop({ default: null, type: Object }) groupedCensus
}
</script>
