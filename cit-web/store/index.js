// import { getAuthToken } from '~/api/ms-auth-api/'
// import { getCommunityList } from '~/api/cit-api'

export const state = () => ({
  legacy: true,
  message: null,
})

export const getters = {
  getLegacy(state) {
    return state.legacy
  },
  getMessage(state) {
    return state.message
  },
}

export const actions = {
  nuxtClientInit({ commit }, context) {
    if (navigator.appVersion.includes('MSIE 10')) {
      this.legacy = true
      this.message =
        'The community information tool is currently not supported on this browser. Microsoft recommendeds you to upgrade to the latest browser'
    }
  },
}
