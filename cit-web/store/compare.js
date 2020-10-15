export const state = () => ({
  mode: null,
  compare: [],
})

export const getters = {
  getCompare(state) {
    return state.compare
  },
  getCompareMode(state) {
    return state.mode
  },
}

export const mutations = {
  setCompare(state, c) {
    state.compare = c
  },
  setCompareMode(state, m) {
    state.mode = m
  },
}
