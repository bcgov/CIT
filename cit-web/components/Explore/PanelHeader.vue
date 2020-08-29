<template>
  <v-expansion-panel-header class="pa-0 ma-0"
    >{{ title }}
    <v-spacer></v-spacer>
    {{ length }}
  </v-expansion-panel-header>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseList from '~/components/Explore/BaseList.vue'
@Component({
  BaseList,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: String }) title
  @Prop({ default: null, type: Number }) length
}
</script>
