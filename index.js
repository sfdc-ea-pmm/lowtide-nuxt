require("dotenv").config()

const http = require('http'),
      express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      cookieParser = require('cookie-parser'),
      socketio = require('socket.io'),
      socketSession = require('express-socket.io-session'),
    { Nuxt, Builder } = require('nuxt');

const config = require('./nuxt.config.js'),
    { setGlobals } = require('./server-middleware/src/utilities');

const isDev = process.env.ENVIRONMENT === 'development',
      port = process.env.PORT || 3000;

const app = express()
const server = http.createServer(app)

// Pass socket server rather than null if standalone api.
const { allowedClients, session } = setGlobals(__dirname + '/server-middleware', server)

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(morgan('dev'))
  .use(allowedClients)
  .use(session)
  .use('/api', api.router)

async function start() {
  
  config.dev = isDev

  const nuxt = new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  server.listen(port, '0.0.0.0')

  console.log(`Server listening on`, process.env.HOSTNAME, `(Port: ${port})`)

}

start()

/* Socket Debug Page - Backend Dev Only!
if (isDev)
  app.get('/', (_, res) => res.sendFile(appRoot + '/public/socket.html'))
*/
