<template>
  <div>
    <v-radio-group v-model="radioGroup" hide-details dense>
      <v-radio
        v-for="(type, index) in tsunamiTypes"
        :key="index"
        :label="type.title"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class WildFire extends Vue {
  radioGroup = null
  tsunamiTypes = [
    {
      title: 'A (moderate)',
    },
    {
      title: 'B (moderate)',
    },
    {
      title: 'C (moderate)',
    },
    {
      title: 'D (low)',
    },
    {
      title: 'E (low)',
    },
    {
      title: 'No Data',
    },
  ]
}
</script>
