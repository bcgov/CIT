import { setPageView } from '~/api/cit-api'
import { getPageViewOptions } from '~/utils'

export default ({ app }) => {
  app.router.afterEach((to, from) => {
    const opts = getPageViewOptions()
    if (opts) {
      setPageView(opts)
        .then((result) => {})
        .catch((e) => {
          console.error(e)
        })
    }
  })
}
