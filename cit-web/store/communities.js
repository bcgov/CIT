export const state = () => ({
  communities: [],
  regionalDistricts: [],
  communityGeoJSON: {},
  dataSources: {},
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
  getDataSources(state) {
    return state.dataSources
  },
}

export const mutations = {
  setCommunities(state, communities) {
    state.communities = communities
  },
  setDataSources(state, ds) {
    state.dataSources = ds
  },
  setRegionalDistricts(state, rds) {
    state.regionalDistricts = rds
  },
  setCommunityGeoJSON(state, cgj) {
    state.communityGeoJSON = cgj
  },
}
