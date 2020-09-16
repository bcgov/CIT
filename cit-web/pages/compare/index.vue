<template>
  <div class="compare-container">
    <v-container fluid>
      <v-row>
        <v-col xl="6">
          <Compare></Compare>
        </v-col>
        <v-col xl="6">
          <Compare></Compare>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { getRegionalDistricts, getCommunityList } from '~/api/cit-api'
import Compare from '~/components/Compare'
import { getAuthToken } from '~/api/ms-auth-api/'
@Component({
  Compare,
})
export default class CompareClass extends Vue {
  async fetch({ store }) {
    const results = await Promise.all([
      getRegionalDistricts(),
      getCommunityList(),
      getAuthToken(),
    ])
    const regionalDistricts = results[0].data.results
    store.commit('communities/setRegionalDistricts', regionalDistricts)
    const communityList = results[1].data
    store.commit('communities/setCommunities', communityList)
    const accessToken = results[2].data.access_token
    store.commit('msauth/setAccessToken', accessToken)
  }
}
</script>
