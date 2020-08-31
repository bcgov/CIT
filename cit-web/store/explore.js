export const state = () => ({
  searchAsMove: false,
  filteredCommunities: false,
  filters: [],
})

export const getters = {
  getSearchAsMove(state) {
    return state.searchAsMove
  },

  getFilteredCommunities(state) {
    return state.filteredCommunities
  },
}

export const mutations = {
  updateSearchAsMove(state, sam) {
    state.searchAsMove = sam
  },
  setFilteredCommunities(state, fc) {
    state.filteredCommunities = fc
  },
}
