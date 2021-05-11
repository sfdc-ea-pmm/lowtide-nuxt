const nuxtConfig = {

  ssr: false,
  target: 'server',

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },

  serverMiddleware: [],

  env: {
    API_URL: process.env.API_URL,
    HOSTNAME: process.env.HOSTNAME
  },

  head: {
    title: 'Lowtide',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/main.css',
  ],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-socket-io'
  ],

  axios: {
    baseURL: process.env.API_URL
  },

  io: {
    sockets: [{
      default: true,
      name: 'main',
      url: process.env.HOSTNAME
    }]
  },

  build: {
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/login.vue')
      })
    }
  },

  telemetry: false

}

if (process.ENVIRONMENT === 'development')
  nuxtConfig.serverMiddleware.push('redirect-ssl')

module.exports = nuxtConfig
