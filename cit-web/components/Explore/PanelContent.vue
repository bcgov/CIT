<template>
  <v-expansion-panel-content class="ma-0 pa-0">
    <v-divider></v-divider>
    <div v-if="regionalDistrict && regionalDistrict !== 'null'">
      <RegionProfileCard
        :regional-district="regionalDistrict"
      ></RegionProfileCard>
      <v-divider></v-divider>
    </div>
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
  @Prop({ default: null }) regionalDistrict
}
</script>
