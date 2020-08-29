<template>
  <div>
    <Panels :grouped-communities="groupedCommunities"></Panels>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Panels from '~/components/Explore/Panels.vue'

@Component({
  Panels,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: Object }) groupedCommunities
}
</script>
