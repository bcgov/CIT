<template>
  <v-breadcrumbs class="pa-0 ma-0" :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: Array }) items
}
</script>
