const Queue = require('bull')

const { runDataflow, generateTimeshiftDataflow, deleteDataflow } = require('../dataflow'),
      refreshDatasets = require('../refresh'),
      deployTemplate = require('../deploy');

const restQueue = new Queue('restQueue', process.env.REDIS_URL)
const deployQueue = new Queue('deployQueue', process.env.REDIS_URL)
const timeshiftQueue = new Queue('timeshiftQueue', process.env.REDIS_URL)

/* Processes */
deployQueue.process('template_deploy', async (job) => {
  const { session, template } = job.data
  const jobExecResult = await deployTemplate({ session, job, template })
  return jobExecResult
})

/* Timeshift 4 step process; refresh -> generate -> run dataflow -> delete primer */
timeshiftQueue.process('refresh_stale_datasets', async (job) => {
  const jobExecResult = await refreshDatasets(job)
  return jobExecResult
})

timeshiftQueue.process('generate_timeshift_dataflow', async (job) => {
  const jobExecResult = await generateTimeshiftDataflow(job)
  return jobExecResult
})

timeshiftQueue.process('delete_primer_dataflow', async (job) => {
  const { dataflowId } = job.data
  const jobExecResult = await deleteDataflow({ job, dataflowId })
  return jobExecResult
})

restQueue.process('dataflow_run', async (job) => {
  const { session, params, body } = job.data
  const jobExecResult = await runDataflow({ session, job, dataflowId: params.id })
  return jobExecResult
})

/* Helper to standardize format and exclude some attributes. */
const formatJobResponse = function(job) {
  const { id, name, opts, data, ...rest } = job,
        { params, body } = data,
        dateKeys = ['timestamp', 'finishedOn', 'processedOn'];
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
