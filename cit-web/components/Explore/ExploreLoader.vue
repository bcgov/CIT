<template>
  <div class="d-flex align-center flex-column mt-10">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <div>
      <p class="text-h6 font-weight-normal">Loading Communities</p>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ExploreLoader extends Vue {}
</script>
