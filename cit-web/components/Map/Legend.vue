<template>
  <div>
    <InternetSpeed></InternetSpeed>
    <Municipal></Municipal>
    <WildfireLegend></WildfireLegend>
    <CensusLegend></CensusLegend>
    <ReservesLegend></ReservesLegend>
    <RegionalLegend></RegionalLegend>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import InternetSpeed from '~/components/Map/Legends/InternetSpeed'
import Municipal from '~/components/Map/Legends/Municipal'
import WildfireLegend from '~/components/Map/Legends/WildfireLegend'
import CensusLegend from '~/components/Map/Legends/CensusLegend'
import ReservesLegend from '~/components/Map/Legends/ReservesLegend'
import RegionalLegend from '~/components/Map/Legends/RegionalLegend'

@Component({
  InternetSpeed,
  Municipal,
  WildfireLegend,
  CensusLegend,
  ReservesLegend,
  RegionalLegend,
})
export default class Legend extends Vue {}
</script>
