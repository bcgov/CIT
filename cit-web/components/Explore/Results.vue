<template>
  <div>
    <Panels class="pa-5" :regional-districts="regionalDistricts"></Panels>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Panels from '~/components/Explore/Panels.vue'

@Component({
  Panels,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: Array }) regionalDistricts
}
</script>
