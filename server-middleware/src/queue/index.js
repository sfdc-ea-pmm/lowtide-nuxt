const Queue = require('bull')

const { runDataflow, generateTimeshiftDataflow, deleteDataflow } = require('../dataflow'),
      refreshDatasets = require('../refresh'),
      deployTemplate = require('../deploy');

const restQueue = new Queue('restQueue', process.env.REDIS_URL)
const deployQueue = new Queue('deployQueue', process.env.REDIS_URL)
const timeshiftQueue = new Queue('timeshiftQueue', process.env.REDIS_URL)

jobQueue.process('template_deploy', (job) => {
  const params = job.data
  const conn = auth.refresh(params.session)
  return s3.downloadAndDeployTemplate(conn, params)
})

jobQueue.process('generate_timeshift_dataflow', (job) => {
  const params = job.data
  const conn = auth.refreshConnection(params.session)
  return ts.generateTimeshiftDataflow(conn, params)
})

const sendUpdate = (job, message, object) => {
  console.log('Send Socket Update.')
  // io.to(job.data.session.socketRoom).emit('jobUpdate', {
  //   message: message, ...object
  // })
}

// jobQueue.on("completed", (job, result) => {
//   console.log(`Job with ID ${job.id} has been completed.`)
//   io.to(job.data.session.socketRoom).emit('jobEnded', {
//     message: 'Job has completed.',
//     id: job.id,
//     result: result,
//     template_keys: job.data.template_keys || null,
//     data: job.data
//   })
// })
//
// jobQueue.on("failed", (job, err) => {
//   console.error(`Job with ID ${job.id} has failed.`)
//   sendUpdate(job, 'Job has failed.', { job, err })
// })
//
// jobQueue.on("error", (error) => {
//   console.error(`A job error occurred: ${error.message}.`)
// })
//
// jobQueue.on("waiting", (jobId) => {
//   console.log(`Job with ID ${jobId} is waiting.`)
// });
//
// jobQueue.on("active", (job, jobPromise) => {
//   console.error(`Job with ID ${job.id} has started.`)
//   sendUpdate(job, 'Job has started.', { job })
// })
//
// jobQueue.on("stalled", (job) => {
//   console.warning(`Job with ID ${job.id} has stalled.`)
//   sendUpdate(job, 'Job has stalled.', { job })
// })
//
// jobQueue.on("progress", (job, progress) => {
//   console.log(`Job with ID ${job.id} has progressed.`)
//   sendUpdate(job, 'Job has progressed.', { job, progress })
// })
//
// jobQueue.on("drained", () => {
//   console.log('Job queue has drained.')
// })

  delete rest.queue
  delete rest.stacktrace

  const response = { id, name, params, body, ...rest }

  for (const [key, value] of Object.entries(response))
    if (dateKeys.includes(key))
      response[key] = new Date(value)

  return response

}

/* Events */

const setListeners = function(emitter) {

  const logEvents = [ 'paused', 'drained', 'cleaned' ];

  const coerceSendEvents = {
    active: 'jobStarted',
    stalled: 'jobInfo',
    progress: 'jobInfo',
    failed: 'jobError',
    completed: 'jobSuccess'
  }

  for (const e of logEvents)
    emitter.on(e, () => console.log(`Internal: lowtide.${emitter.name} event: ${e}.`))

  for (const [key, evt] of Object.entries(coerceSendEvents)) {
    if (['progress', 'failed', 'completed'].includes(key))
      emitter.on(key, (job, data) => {
        jobs.emit(evt, {
          job,
          producer: `lowtide.${emitter.name}`,
          payload: data
        })
      })
    else
      emitter.on(key, job =>  {
        jobs.emit(evt, {
          job, producer: `lowtide.${emitter.name}`,
        })
      })
  }

  return emitter

}

module.exports = {
  restQueue: setListeners(restQueue),
  deployQueue: setListeners(deployQueue),
  timeshiftQueue: setListeners(timeshiftQueue),
  formatJobResponse
}
