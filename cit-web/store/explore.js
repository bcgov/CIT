export const state = () => ({
  searchAsMove: false,
})

export const getters = {
  getSearchAsMove(state) {
    return state.searchAsMove
  },
}

export const mutations = {
  updateSearchAsMove(state, sam) {
    state.searchAsMove = sam
  },
}
