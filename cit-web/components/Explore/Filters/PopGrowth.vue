<template>
  <div>
    <v-radio-group v-model="radioGroup" hide-details dense>
      <v-radio
        v-for="(type, index) in populationTypes"
        :key="index"
        :label="type.title"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class PopGrowth extends Vue {
  radioGroup = null
  populationTypes = [
    {
      title: 'Shrinking',
    },
    {
      title: 'No Change',
    },
    {
      title: 'Growing (<25%)',
    },
    {
      title: 'Rapid Growth (>25%)',
    },
  ]
}
</script>
