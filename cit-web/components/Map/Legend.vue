<template>
  <div>
    <InternetSpeed></InternetSpeed>
    <Municipal></Municipal>
    <WildfireLegend></WildfireLegend>
    <CensusLegend></CensusLegend>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import InternetSpeed from '~/components/Map/Legends/InternetSpeed'
import Municipal from '~/components/Map/Legends/Municipal'
import WildfireLegend from '~/components/Map/Legends/WildfireLegend'
import CensusLegend from '~/components/Map/Legends/CensusLegend'

@Component({
  InternetSpeed,
  Municipal,
  WildfireLegend,
  CensusLegend,
})
export default class Legend extends Vue {}
</script>
