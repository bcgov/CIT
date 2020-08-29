<template>
  <div>
    <v-expansion-panels flat multiple hover>
      <v-expansion-panel
        v-for="(communities, regionalDistrict) in groupedCommunities"
        :key="'region' + regionalDistrict"
      >
        <PanelHeader
          :title="getRdName(regionalDistrict)"
          :length="communities.length"
        ></PanelHeader>

        <PanelContent :communities="communities"></PanelContent>
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

  get mappedRds() {
    const temp = {}
    this.regionalDistricts.map((rd) => {
      temp[rd.id] = rd.name
    })
    return temp
  }

  getRdName(id) {
    const mappedRds = this.mappedRds
    return mappedRds[id]
  }
}
</script>
