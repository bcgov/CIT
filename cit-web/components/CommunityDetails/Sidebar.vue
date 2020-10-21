<template>
  <div class="community-details-sidebar">
    <slot></slot>
    <v-expansion-panels v-model="panel" class="mt-2 cd-panel">
      <v-expansion-panel
        v-for="groupedLocation in groupedLocations"
        :key="groupedLocation.group"
      >
        <v-expansion-panel-header class="px-4 py-3">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <img
                height="18"
                width="18"
                :src="require(`~/assets/icons/${groupedLocation.group}.svg`)"
                :alt="groupedLocation.group"
                class="mr-2"
              />
              {{
                startCase(
                  groupedLocation.group.replace('servicebc', 'Service BC')
                )
              }}
            </div>
            <v-chip small class="font-weight-medium ma-0 ml-0 text-body-1">
              {{ groupedLocation.locations.length }}
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-2">
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
          .
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import startCase from 'lodash/startCase'

@Component({
  methods: {
    startCase,
  },
})
export default class MainReport extends Vue {
  dialog = false

  panel = null

  @Watch('panel')
  watchPanel() {
    let locationType = null
    if (this.panel !== undefined) {
      locationType = this.groupedLocations[this.panel].group
    }
    this.$emit('panel', locationType)
  }

  @Prop({ default: null, type: String }) placeName
  @Prop({ default: null, type: Number }) rid
  @Prop({ default: null, type: String }) district
  @Prop({ default: null, type: Array }) groupedLocations
  @Prop({ default: null, type: Object }) groupedCensus
}
</script>
<style lang="scss">
.cd-panel .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
<style lang="scss">
.community-details-sidebar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.community-details-sidebar::-webkit-scrollbar {
  width: 8px;
  height: 5px;
  background-color: #fff;
}

.community-details-sidebar::-webkit-scrollbar-thumb {
  background-color: #073366;
  border: 2px solid #555;
  border-radius: 1em;
}
</style>
