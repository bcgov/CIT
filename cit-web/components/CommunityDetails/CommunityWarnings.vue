<template>
  <div>
    <v-alert
      v-if="parentCommunity || !incorporated"
      type="info"
      class="primary--text ma-0"
    >
      <ul>
        <li v-if="parentCommunity">
          This community is within {{ parentCommunity.name }}'s boundary.
          Consider
          <nuxt-link
            :to="`/community/${parentCommunity.id}`"
            class="font-weight-bold"
            >viewing the {{ parentCommunity.name }} page instead.</nuxt-link
          >
        </li>
        <li v-if="!incorporated">
          This is an unincorporated community, so demographic information is
          only available for the containing census subdivision.
        </li>
      </ul>
    </v-alert>
  </div>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class CommunityWarnings extends Vue {
  @Prop({ default: false, type: Boolean }) incorporated
  @Prop({ default: null }) parentCommunity
}
</script>
