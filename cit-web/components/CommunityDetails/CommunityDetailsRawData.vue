<template>
  <v-dialog :value="show" max-width="800">
    <v-toolbar color="primary" dense elevation="3">
      <v-toolbar-title style="color: white;">{{ placeName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon color="white" @click="$emit('close')">mdi-close</v-icon>
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
        <v-btn text color="primary" @click="$emit('close')">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CommunityDetailsRawData extends Vue {
  @Prop({ default: null, type: Object }) groupedCensus
  @Prop({ default: null, type: String }) placeName
  @Prop({ default: false, type: Boolean }) show
}
</script>
