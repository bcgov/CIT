<template>
  <div>
    <v-card>
      <v-card-title class="body-2 pb-0" dense>{{ location.name }}</v-card-title>
      <v-card-text class="pb-0">
        <div class="caption">
          {{ location.public_or_independent }}
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn x-small text color="primary accent-4" @click="triggerFind">
          Find On Map
          <v-icon small dark>mdi-map-marker</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <v-list>
              <v-list-item v-for="(val, key) in location" :key="key" two-line>
                <v-list-item-content>
                  <v-list-item-title>{{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ val }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class LocationCard extends Vue {
  @Prop({ default: null, type: String }) type
  @Prop({ default: null, type: Object }) location

  show = false

  get getIcon() {
    return this.getLocationMetaData(this.type).icon
  }

  getLocationMetaData(location) {
    return {
      schools: {
        icon: 'mdi-school',
      },
      hospitals: {
        icon: 'mdi-hospital-box',
      },
    }[location]
  }

  triggerFind(e) {
    this.$root.$emit('map-find', [
      this.location.longitude,
      this.location.latitude,
    ])
  }
}
</script>
