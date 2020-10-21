<template>
  <div>
    <component :is="legendComponent"></component>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'WildfireLegend',
})
export default class DynamicLegend extends Vue {
  @Prop({ default: null, type: String }) componentName

  get legendComponent() {
    return () => import(`~/components/Map/Legends/${this.componentName}`)
  }
}
</script>
