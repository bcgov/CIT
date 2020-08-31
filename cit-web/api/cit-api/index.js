let $axios = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
}

export function getCommunityList(params) {
  return $axios.get(`api/pipeline/communities/search/`)
}

export function getCommunity(id) {
  return $axios.get(`api/pipeline/communities/${id}/`)
}

export function getCensusSubDivision(id) {
  return $axios.get(`api/pipeline/censussubdivisions/${id}/`)
}

export function getRegionalDistricts() {
  return $axios.get(`api/pipeline/regionaldistricts/`)
}

export function advancedSearch(params) {
  return $axios.get(`api/pipeline/communities/advanced_search/`, {
    params,
  })
}
