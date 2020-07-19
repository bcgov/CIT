let $axios = null
let $store = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
}
export function setStore(store) {
  $store = store
}
export function GetReportInGroup(groupId, reportId) {
  return $axios.get(
    `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}`,
    {
      headers: {
        Authorization: `Bearer ${$store.getters['msauth/getAccessToken']}`,
      },
    }
  )
}
