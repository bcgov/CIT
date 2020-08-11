<template>
  <div>
    <CommunityList></CommunityList>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import CommunityList from '~/components/CommunityList.vue'

@Component({ CommunityList })
export default class CommunitySearch extends Vue {}
</script>
