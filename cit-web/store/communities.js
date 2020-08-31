export const state = () => ({
  communities: [],
  regionalDistricts: [],
})

export const getters = {
  getCommunities(state) {
    return state.communities
  },
  getRegionalDistricts(state) {
    return state.regionalDistricts
  },
}

export const mutations = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setRegionalDistricts(state, rds) {
    state.regionalDistricts = rds
  },
}
