<template>
  <div class="pt-5 pb-5">
    <div class="d-flex justify-center pl-3 pr-3"></div>
    <slot></slot>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class MainReport extends Vue {
  @Prop({ default: null, type: String }) placeName
}
</script>
