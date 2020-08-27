<template>
  <div>
    <v-expansion-panels flat multiple>
      <v-expansion-panel v-for="rd in regionalDistricts" :key="rd.id">
        <v-expansion-panel-header
          >{{ rd.name }}
          <v-spacer></v-spacer>
          13
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
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
