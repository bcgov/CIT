import { getAuthToken } from '~/api/ms-auth-api/'

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
  },
}
