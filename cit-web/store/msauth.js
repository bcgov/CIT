// import { getAuthToken } from '~/api/ms-auth-api/'

export const state = () => ({
  accessToken: null,
})

export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
}

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
}

export const actions = {
  nuxtServerInit({ dispatch, commit }) {
    console.log('Server Init')
    /*
    return getAuthToken().then((response) => {
      const { status } = response
      if (status === 200) {
        const accessToken = response.data && response.data.access_token
        console.log('Access Token', accessToken)
        if (accessToken) {
          commit('msauth/setAccessToken', accessToken)
        }
      }
    })
    */
  },
}
