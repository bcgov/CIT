import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 8080,
    host: '0.0.0.0',
  },

  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: (titleChunk) => {
      const appTitle = 'B.C. Community Information Tool'
      return titleChunk ? `${titleChunk} | ${appTitle}` : appTitle
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/powerbi-client@2.13.3/dist/powerbi.min.js ',
      },
      {
        src: 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js',
      },
    ],
    link: [
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/bcid-favicon-32x32.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/bcid-favicon-16x16.png',
      },
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@bcgov/bc-sans/css/BCSans.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/nuxt-axios-port.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/vuetify'],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development' ? 'http://nginx/' : 'http://nginx',
    browserBaseURL: process.env.NODE_ENV === 'development' ? '/' : '/',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/scss/vuetify/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: '#073366',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#073366',
        },
      },
    },
  },
  styleResources: {
    scss: ['./assets/scss/globals/variables/*.scss'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: true,
    babel: {
      presets(env, [preset, options]) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              loose: true,
            },
          ],
        ]
      },
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
  publicRuntimeConfig: {
    MAPBOX_API_KEY:
      'pk.eyJ1IjoiY291bnRhYmxlLXdlYiIsImEiOiJjamQyZG90dzAxcmxmMndtdzBuY3Ywa2ViIn0.MU-sGTVDS9aGzgdJJ3EwHA',
    reportId: process.env.POWERBI_REPORT_ID,
    citFeedbackEmail: 'networkbc@gov.bc.ca',
  },
  watchers: {
    webpack: {
      ignored: /node_modules/,
    },
  },
}
