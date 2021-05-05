const fs = require("fs"),
      path = require("path"),
      jsforce = require("jsforce"),
      express = require("express"),
      morgan = require("morgan"),
      cors = require("cors"),
      session = require("express-session"),
      createError = require('http-errors'),
      cookieParser = require('cookie-parser'),
      socketSession = require("express-socket.io-session");

global.appRoot = path.resolve(__dirname)

const config = require("./config"),
      repo = require("./src/repo"),
      auth = require("./src/auth"),
      //logger = require("./src/logger"),
      socketio = require("socket.io"),
      router = require("./src/router");

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app
  .use(cors(config.corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(morgan('dev'))
  .use(cookieParser())
  .use(auth.session)
  .use("/*", auth.required)
  .use(auth.middleware)

app.use("/data/*", auth.refreshed)

// //catch 404 and forward to error handler
//
// app.use(function(req, res, next) {
//   console.log("throw an error!")
//   next(createError(404));
// });
//
// // error handler
//
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//const server = app.listen(process.env.PORT || 8080)

//
// global.io = socketio(server)
//
// io.use(socketSession(auth.session))
//
// io.on('connection', socket => {
//   socket.on('subscribeToJobUpdates', (providedId) => {
//     const sessionId = providedId || socket.handshake.session.socketRoom
//     console.log('Subscribing to updates, roomId:', sessionId)
//     socket.join(sessionId)
//   })
// })

/* Folders (Analytics Applications) */

app.route(config.ltApi("org_folders"))
  .get(router.org.getFolders)
app.route(config.ltApi("org_folders_id"))
  .get(router.org.getFolder)

/* Repository */

app.route(config.ltApi("repo_templates"))
  .get(router.repo.getTemplates)

app.route(config.ltApi("repo_template_download"))
  .post(router.repo.downloadTemplate)

app.route(config.ltApi("repo_template_deploy"))
  .post(router.repo.deployFromS3)

/* Jobs */

app.route(config.ltApi("session_jobs"))
  .get(router.jobs.checkSessionJobs)


module.exports = app;
