<template>
  <v-expansion-panel-content class="ma-0 pa-0">
    <BaseList :communities="communities"> </BaseList>
  </v-expansion-panel-content>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseList from '~/components/Explore/BaseList.vue'
@Component({
  BaseList,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: Array }) communities
}
</script>
