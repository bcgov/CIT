let $axios = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
}

export function getCommunity(id) {
  return $axios.get(`api/pipeline/communities/${id}/`)
}

export function getCensusSubDivision(id) {
  return $axios.get(`api/pipeline/censussubdivisions/${id}/`)
}
