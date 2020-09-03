<template>
  <div>
    Explore Layer Switcher
    <LayerSwitcher></LayerSwitcher>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import LayerSwitcher from '~/components/LayerSwitcher'
@Component({
  LayerSwitcher,
})
export default class ExploreLayerSwitcher extends Vue {}
</script>
