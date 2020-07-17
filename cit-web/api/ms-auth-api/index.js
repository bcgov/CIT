let $axios = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
  console.log($axios)
}
export function getAuthToken() {
  return $axios.get('api/token/')
}
