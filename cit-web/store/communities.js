export const state = () => ({
  communities: [],
})

export const getters = {
  getCommunities(state) {
    return state.communities
  },
}

export const mutations = {
  setCommunities(state, communities) {
    state.communities = communities
  },
}
