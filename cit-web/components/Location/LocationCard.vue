<template>
  <div>
    <v-card>
      <v-card-title
        class="body-2 pb-0 text-body-1"
        dense
        style="word-break: break-word;"
        >{{ name }}</v-card-title
      >
      <v-card-text class="pb-0">
        <ul class="ma-0 pa-0" style="list-style: none;">
          <li v-if="location.location_email">
            Email: {{ location.location_email }}
          </li>
          <li v-if="location.location_phone">
            Phone: {{ location.location_phone }}
          </li>
          <li v-if="location.location_website">
            Website:
            <a :href="location.location_website" target="_blank">{{
              location.location_website
            }}</a>
          </li>
        </ul>
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
        <!--
        <v-btn
          x-small
          text
          color="primary accent-4"
          class="text-body-1 text-capitalize font-weight-medium"
          @click="triggerInfo"
        >
          Info
          <v-icon small>mdi-arrow-right</v-icon>
        </v-btn>
        -->
      </v-card-actions>
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

  get name() {
    if (this.location.type === 'projects') {
      return this.location.project_name
    }
    return this.location.name
  }

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

  triggerInfo(e) {
    this.$root.$emit('map-find-location', {
      center: [this.location.longitude, this.location.latitude],
      location: this.location,
    })
  }
}
</script>
