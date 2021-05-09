const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      cookieParser = require('cookie-parser');

const { setGlobals } = require('./src/utilities')

const app = express()

// Pass socket server rather than null, dude.
const { allowedClients, session } = setGlobals(__dirname, null)

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(morgan('dev'))
  .use(allowedClients)
  .use(session)
  .use(api.router)
  .listen(process.env.PORT || 3000)

/* Socket Debug Page - Backend Dev Only!
if (process.env.ENVIRONMENT === "development")
  app.get('/', (_, res) => res.sendFile(appRoot + '/public/socket.html'))
*/

module.exports = app
