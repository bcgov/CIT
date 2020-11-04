<template>
  <div>
    <v-card width="300" class="rounded-lg">
      <v-app-bar flat color="primary" height="50">
        <v-toolbar-title class="title white--text pl-0 text-body-1">
          {{ name }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn x-small icon fab color="white" class="location-popup-close">
          <v-icon class="location-popup-close-icon">mdi-close-circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <ul class="ma-0 pa-0" style="list-style: none;">
          <li>Name: {{ name }}</li>
        </ul>
        <ul v-if="source" class="ma-0 pa-0" style="list-style: none;">
          <li>Type: {{ source.display_name }}</li>
          <li>Source: {{ source.source }}</li>
          <li>
            Source URL:
            <a :href="source.source_url" target="_blank">{{
              source.source_url
            }}</a>
          </li>
        </ul>
        <ul v-if="locationProps" class="ma-0 pa-0" style="list-style: none;">
          <li v-if="locationProps.location_email">
            Email: {{ locationProps.location_email }}
          </li>
          <li v-if="locationProps.location_phone">
            Phone: {{ locationProps.location_phone }}
          </li>
          <li v-if="locationProps.location_website">
            Website: {{ locationProps.location_phone }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { getDataSourceList } from '~/api/cit-api'
@Component
export default class LocationPopup extends Vue {
  @Prop({ default: null, type: String }) locationType
  @Prop({ default: null, type: Object }) locationProps
  @Prop({ default: null, type: String }) name
  mounted() {}

  dataSource = null

  get source() {
    if (this.dataSource === null) {
      return {}
    }

    return this.dataSource.find((ds) => ds.name === this.locationType)
  }

  async fetch() {
    if (this.dataSource === null) {
      const result = await getDataSourceList()
      this.dataSource = result.data.results
    }
  }
}
</script>
