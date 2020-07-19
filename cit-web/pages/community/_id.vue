<template>
  <div>Hello {{ testProp }}</div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component()
export default class MyComponent extends Vue {
  @Prop({ default: 'default value', type: String })
  testProp

  mounted() {
    console.log('Mounted')
  }
}
</script>
