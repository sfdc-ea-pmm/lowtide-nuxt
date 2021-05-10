export default {

  ssr: false,
  target: 'server',

  server: {
<<<<<<< HEAD
    port: '0',
=======
    port: '80',
>>>>>>> bcd80ee4fd015d081be569b75cef6fb389525b5a
    host: '0.0.0.0'
  },

  serverMiddleware: [

    {
      path: '/api', handler: '~/server-middleware/index.js'
    }
  ],

  env: {
    API_URL: process.env.HOSTNAME + '/api',
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
    // we could have multiple sockets that we identify with names
    // one of these sockets may have set "default" to true
    sockets: [{
      default: true, // make this the default socket
      name: 'main', // give it a name that we can later use to choose this socket in the .vue file
      url: process.env.SOCKET_URL || 'http://localhost:3001' // URL wherever your socket IO server runs
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
