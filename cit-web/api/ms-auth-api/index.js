let $axios = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
}
export function getAuthToken() {
  return $axios.get('api/token/')
}
