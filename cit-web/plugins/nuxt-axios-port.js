import * as MsAuthApi from '~/api/ms-auth-api'
import * as EmbedTokenApi from '~/api/powerbi-rest-api/EmbedToken.js'
import * as ReportApi from '~/api/powerbi-rest-api/Report.js'
import * as citApi from '~/api/cit-api'

// We provide nuxt-axios and nuxt/vue store to these ES6 modules so that our nuxt application can use them
// without passing them in everytime.
// Note that somewhere in the application, the access token must be set.
export default ({ app }) => {
  MsAuthApi.setNuxtAxios(app.$axios)
  citApi.setNuxtAxios(app.$axios)

  EmbedTokenApi.setNuxtAxios(app.$axios)
  EmbedTokenApi.setStore(app.store)

  ReportApi.setNuxtAxios(app.$axios)
  ReportApi.setStore(app.store)
}
