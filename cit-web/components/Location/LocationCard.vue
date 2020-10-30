<template>
  <div>
    <v-card>
      <v-card-title class="body-2 pb-0 text-body-1" dense>{{
        location.name
      }}</v-card-title>
      <v-card-text class="pb-0">
        <div class="text-body-1">
          {{ location.public_or_independent }}
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
          x-small
          text
          color="primary accent-4"
          class="text-body-1 text-capitalize font-weight-medium"
          @click="triggerFind"
        >
          Find On Map
          <v-icon small dark>mdi-map-marker</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!isEmpty(locationFields)" small icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(val, key) in locationFields"
                :key="key"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize">{{
                    key
                  }}</v-list-item-title>
                  <v-list-item-subtitle v-if="key === 'website'">
                    <a :href="val">{{ val }}</a></v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-else>{{ val }}</v-list-item-subtitle>
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
import isEmpty from 'lodash/isEmpty'

@Component({
  methods: {
    isEmpty,
  },
})
export default class LocationCard extends Vue {
  @Prop({ default: null, type: String }) type
  @Prop({ default: null, type: Object }) location

  show = false

  get locationFields() {
    const temp = {}
    const phone = this.location.location_phone
    const keywords = this.location.location_keywords
    const website = this.location.location_website

    if (phone) {
      temp.phone = phone
    }
    if (keywords) {
      temp.keywords = phone
    }
    if (website) {
      temp.website = website
    }

    return temp
  }

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
