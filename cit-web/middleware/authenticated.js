import { getAuthToken } from '~/api/ms-auth-api/'

export default async function ({ store, redirect }) {
  const results = await Promise.all([getAuthToken()])
  const accessToken = results[0].data.access_token
  store.commit('msauth/setAccessToken', accessToken)
}
