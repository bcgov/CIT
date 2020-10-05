<template>
  <div>
    <InternetSpeed></InternetSpeed>
    <Municipal></Municipal>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import InternetSpeed from '~/components/Map/Legends/InternetSpeed'
import Municipal from '~/components/Map/Legends/Municipal'

@Component({
  InternetSpeed,
  Municipal,
})
export default class Legend extends Vue {}
</script>
