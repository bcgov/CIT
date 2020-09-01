<template>
  <div>
    <v-radio-group v-model="radioGroup" hide-details dense>
      <v-radio
        v-for="(type, index) in internetTypes"
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
  internetTypes = [
    {
      title: '50/10 75+% Availability',
    },
    {
      title: '25/5 75+% Availability',
    },
    {
      title: 'Low/No Availability',
    },
  ]
}
</script>
