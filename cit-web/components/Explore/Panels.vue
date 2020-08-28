<template>
  <div>
    <v-expansion-panels flat multiple hover>
      <v-expansion-panel v-for="rd in regionalDistricts" :key="rd.id">
        <v-expansion-panel-header class="pa-0 ma-0"
          >{{ rd.name }}
          <v-spacer></v-spacer>
          13
        </v-expansion-panel-header>
        <v-expansion-panel-content class="ma-0 pa-0">
          <v-list two-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Vancouver</v-list-item-title>
                <v-list-item-subtitle>56 Locations</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn text>View Details</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Vancouver</v-list-item-title>
                <v-list-item-subtitle>56 Locations</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn text>View Details</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Explore extends Vue {
  @Prop({ default: null, type: Array }) regionalDistricts
}
</script>
