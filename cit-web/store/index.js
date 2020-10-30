// import { getAuthToken } from '~/api/ms-auth-api/'
// import { getCommunityList } from '~/api/cit-api'

export const actions = {
  nuxtClientInit({ commit }, context) {
    if (navigator.appVersion.includes('MSIE 10')) {
      window.alert(
        'The community information tool is currently not supported on this browser. Microsoft recommendeds you to upgrade to the latest browser'
      )
    }
  },
}
