export const state = () => ({
  accessToken: null,
  isError: false,
  isLoading: null,
})

export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },

  getIsError(state) {
    return state.isError
  },
}

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setIsError(state, isError) {
    state.isError = isError
  },
}
