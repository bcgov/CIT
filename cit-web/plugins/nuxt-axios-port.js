import { setNuxtAxios } from '~/api/ms-auth-api'

export default ({ app, store }) => {
  setNuxtAxios(app.$axios)
}
