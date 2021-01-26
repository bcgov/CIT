<template>
  <div>
    <v-checkbox
      v-model="clinics"
      hide-details
      dense
      label="Has Clinics"
    ></v-checkbox>
    <v-checkbox
      v-model="hospitals"
      hide-details
      dense
      label="Has Hospitals"
    ></v-checkbox>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class Health extends Vue {
  clinics = false
  hospitals = false
}
</script>
