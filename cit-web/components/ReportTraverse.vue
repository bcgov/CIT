<template>
  <div>
    <v-toolbar>
      <v-spacer></v-spacer>
      <div class="mr-2">Choose another report</div>
      <div style="max-width: 250px;">
        <v-select
          v-model="selected"
          hide-details
          :items="items"
          item-value="name"
          item-text="name"
        ></v-select>
      </div>
      <v-btn class="ml-3" color="primary" @click="$emit('traverse', selected)"
        >Go</v-btn
      >
    </v-toolbar>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import reportPages from '~/data/communityDetails/reportPages.json'
@Component
export default class ReportTraverse extends Vue {
  items = reportPages
  selected = 'Housing'
}
</script>
