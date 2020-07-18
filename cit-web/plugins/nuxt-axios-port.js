import * as MsAuthApi from '~/api/ms-auth-api'
import * as EmbedTokenApi from '~/api/powerbi-rest-api/EmbedToken.js'

export default ({ app }) => {
  MsAuthApi.setNuxtAxios(app.$axios)
  EmbedTokenApi.setNuxtAxios(app.$axios)
  EmbedTokenApi.setStore(app.store)
}
