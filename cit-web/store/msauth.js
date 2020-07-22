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
