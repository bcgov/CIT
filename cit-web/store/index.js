import { getAuthToken } from '~/api/ms-auth-api/'
import { getCommunityList } from '~/api/cit-api'

export const actions = {
  // Special action hook provided by nuxt for initialization, only works in index.js with module mode enabled
  async nuxtServerInit({ dispatch, commit }) {
    try {
      const response = await getAuthToken()
      const { status } = response
      if (status === 200) {
        const accessToken = response.data && response.data.access_token
        if (accessToken) {
          commit('msauth/setAccessToken', accessToken)
        }
      }
    } catch (e) {
      commit('msauth/setAccessToken', null)
    }

    try {
      const response = await getCommunityList()
      const { status } = response
      if (status === 200) {
        const communities = response.data
        if (communities) {
          commit('communities/setCommunities', communities)
        }
      }
    } catch (e) {
      commit('communities/setCommunities', [])
    }
  },
}
