<template>
  <div>
    <v-btn color="primary" @click="$root.$emit('reportClose')">Close</v-btn>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class FeedbackButton extends Vue {}
</script>
