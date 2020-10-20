<template>
  <div class="my-5">
    <ul class="region-profile-card-list ma-0 pa-0 px-5">
      <li v-for="rd in regionalData" :key="rd.title" class="ma-0 pa-0 my-1">
        <span class="d-inline-block font-weight-bold">{{ rd.title }}: </span>
        <span class="d-inline-block">{{ rd.value }}{{ rd.unit || '' }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class RegionProfileCard extends Vue {
  regionalData = [
    {
      title: 'Median Income',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Population Density',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Median Age',
      value: 'N/A',
      unit: null,
    },
    {
      title: 'Employment Rate',
      value: 'N/A',
      unit: null,
    },
    {
      title: '% Population with Post-secondary Education',
      value: 'N/A',
      unit: null,
    },
    {
      title: '% Community with Broadband Access',
      value: 'N/A',
      unit: null,
    },
  ]
}
</script>
<style lang="scss" scoped>
.region-profile-card-list {
  list-style: none;
}
</style>
