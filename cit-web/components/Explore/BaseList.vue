<template>
  <v-list two-line subheader>
    <BaseListItem
      v-for="(community, index) in communities"
      :key="'community' + community.id + getTime() + index"
      :title="community.place_name"
      :cid="community.id"
      :center="[community.longitude, community.latitude]"
      subtitle=""
    >
    </BaseListItem>
  </v-list>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BaseListItem from '~/components/Explore/BaseListItem.vue'
@Component({
  BaseListItem,
})
export default class BaseList extends Vue {
  @Prop({ default: null, type: Array }) communities

  getTime() {
    return Date.now()
  }

  mounted() {
    console.log(this.communities)
  }
}
</script>
