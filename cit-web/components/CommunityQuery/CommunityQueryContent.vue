<template>
  <div>
    Mapbox embed
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class CommunityQueryContent extends Vue {
  embedToken = null
  groupId = '99dbfebe-3c0b-4b2d-affb-3af843c67549'
  reportId = '2df94147-e5bc-48f2-bdfa-4a78f059e7c9'
  embedUrl = null
  report = null

  @Prop({ default: undefined, type: Object })
  filters

  @Watch('filters') onFiltersChanged() {
    console.log('filters', this.filters, this.filters.communityType)
  }
}
</script>
