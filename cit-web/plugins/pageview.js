import { setPageView } from '~/api/cit-api'
import { getPageViewOptions } from '~/utils'

export default ({ app }) => {
  console.log('Plugin')
  app.router.afterEach((to, from) => {
    const opts = getPageViewOptions()
    console.log('Firing with', opts)
    if (opts) {
      setPageView(opts)
        .then((result) => {})
        .catch((e) => {
          console.error(e)
        })
    }
  })
}
