<template>
  <div>
    <v-expansion-panels v-model="panel" flat multiple hover>
      <v-expansion-panel
        v-for="(communities, regionalDistrict) in groupedCommunities"
        :key="'region' + regionalDistrict"
        @change="handlePanelChange"
      >
        <PanelHeader
          :title="getRdName(regionalDistrict)"
          :length="communities.length"
        ></PanelHeader>

        <PanelContent
          :communities="communities"
          class="explore-content-panel"
        ></PanelContent>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import BaseList from '~/components/Explore/BaseList.vue'
import PanelHeader from '~/components/Explore/PanelHeader.vue'
import PanelContent from '~/components/Explore/PanelContent.vue'
const commModule = namespace('communities')
@Component({
  PanelHeader,
  PanelContent,
  BaseList,
})
export default class Explore extends Vue {
  @Prop({ default: null, type: Object }) groupedCommunities
  @commModule.Getter('getRegionalDistricts') regionalDistricts

  panel = []

  handlePanelChange(e) {
    console.log(this.panel)
    console.log(e)
  }

  get mappedRds() {
    const temp = {}
    this.regionalDistricts.map((rd) => {
      temp[rd.id] = rd.name
    })
    return temp
  }

  getRdName(id) {
    const mappedRds = this.mappedRds
    return mappedRds[id] || 'No Regional District'
  }
}
</script>
<style lang="scss">
.explore-content-panel .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
