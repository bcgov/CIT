<template>
  <div>
    <v-checkbox
      v-model="mills"
      hide-details
      dense
      label="Has Mills"
    ></v-checkbox>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class Health extends Vue {
  mills = false
}
</script>
