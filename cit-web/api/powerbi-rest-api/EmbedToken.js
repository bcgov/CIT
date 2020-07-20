let $axios = null
let $store = null

export function setNuxtAxios(nuxtAxios) {
  $axios = nuxtAxios
}
export function setStore(store) {
  $store = store
}
export function GenerateTokenInGroup(
  groupId,
  reportId,
  requestBody = {
    accessLevel: 'view',
  },
  accessToken
) {
  return $axios.post(
    `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${$store.getters['msauth/getAccessToken']}`,
      },
    }
  )
}
