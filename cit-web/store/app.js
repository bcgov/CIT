export const state = () => ({
  fixed: false,
})

export const getters = {
  getFixed(state) {
    return state.fixed
  },
}

export const mutations = {
  setFixed(state, f) {
    state.fixed = f
  },
}
