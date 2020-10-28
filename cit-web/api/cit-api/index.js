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

export function getPopulation(id) {
  return $axios.get(`api/pipeline/communities/${id}/population`)
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

export function getCommunityGeoJSON() {
  return $axios.get(`api/pipeline/communities/geojson/`)
}

export function getDataSourceList() {
  return $axios.get(`/api/pipeline/datasources/`)
}

export function getRegionalData(id) {
  return $axios.get(`/api/pipeline/regionaldistricts/${id}/`)
}

export function getPageViews() {
  return $axios.get(`/api/pipeline/pageviews/`)
}

export function setPageView(opts) {
  return $axios.post(`/api/pipeline/pageviews/`, opts)
}
