export const state = () => ({
  communities: [],
  regionalDistricts: [],
  communityGeoJSON: {},
})

export const getters = {
  getCommunities(state) {
    return state.communities
  },
  getRegionalDistricts(state) {
    return state.regionalDistricts
  },
  getCommunityGeoJSON(state) {
    return state.communityGeoJSON
  },
}

export const mutations = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setRegionalDistricts(state, rds) {
    state.regionalDistricts = rds
  },
  setCommunityGeoJSON(state, cgj) {
    state.communityGeoJSON = cgj
  },
}
