<template>
  <div>
    <v-radio-group v-model="radioGroup" hide-details dense>
      <v-radio
        v-for="(type, index) in wildFireTypes"
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
  wildFireTypes = [
    {
      title: '1 (low)',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
    },
    {
      title: '5 (extreme)',
    },
    {
      title: 'No Data',
    },
  ]
}
</script>
