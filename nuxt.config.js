export default {

  ssr: false,

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  serverMiddleware: [
    {
      path: '/api', handler: '~/server-middleware/index.js'
    }
  ],

  env: {
    API_URL: process.env.API_URL || 'https://lowtidebeta.herokuapp.com:3000/api',
    HOSTNAME: process.env.HOSTNAME || 'https://lowtidebeta.herokuapp.com:3000'
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
    baseURL: 'https://lowtidebeta.herokuapp.com:3000/api'
  },

  io: {
    // we could have multiple sockets that we identify with names
    // one of these sockets may have set "default" to true
    sockets: [{
      default: true, // make this the default socket
      name: 'main', // give it a name that we can later use to choose this socket in the .vue file
      url: 'https://lowtidebeta.herokuapp.com:3001' // URL wherever your socket IO server runs
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
  }

}
