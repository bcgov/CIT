<template>
  <div>
    <v-btn
      color="primary"
      :href="`mailto:${$config.citFeedbackEmail}?subject=CIT Feedback`"
      >Give Feedback</v-btn
    >
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class FeedbackButton extends Vue {}
</script>
