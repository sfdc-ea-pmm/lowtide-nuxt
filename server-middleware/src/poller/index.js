const { sfApi } = require('../utilities'),
      { refresh } = require('../auth');

const pollEndpoint = async function(job, responseContext, interval = 5, timeout = 1800) {

  const {
    producer,
    endpoint,
    statusPath,
    startStatus,
    infoStatus,
    successStatus,
    errorStatus
  } = responseContext

  interval *= 1000; timeout *= 1000;

  let errorCount = 0
  let remaining = timeout
  let currentSfJobStatus = null

  let sleep = () => new Promise(resolve => setTimeout(resolve, interval))
  let resolve = (path, obj) => {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null
    }, obj || self)
  }

  const { session, ...rest } = job.data, jobInfo = {
      id: job.id,
      name: job.name,
      queue: job.queue.name,
      context: rest
    };

  const sf = refresh(session)

  while (remaining > 0) {

    try {

      const pingResult = await sf.request(endpoint),
            pingStatus = resolve(statusPath, pingResult),
            statusChange = pingStatus !== currentSfJobStatus;

      if (startStatus.includes(pingStatus) && !currentSfJobStatus)
        jobs.emit('jobStarted', { job, producer } )

      if (statusChange && infoStatus.includes(pingStatus)) {
        jobs.emit('jobInfo', { job, producer, message: pingStatus })
        currentSfJobStatus = pingStatus
      }

      if (successStatus.includes(pingStatus)) {
        const successPayload = { job: jobInfo, status: 'success', result: pingResult }
        jobs.emit('jobSuccess', { job, producer, message: pingStatus, payload: successPayload })
        return successPayload
      }

      if (errorStatus.includes(pingStatus)) {
        const errorPayload = { job: jobInfo, status: 'error', result: pingResult }
        jobs.emit('jobError', { job, producer, message: pingStatus, payload: errorPayload })
        return errorPayload
      }

    } catch (error) {

      const { errorCode, message } = error
      errorCount += 1

      console.error(`Poller error (${errorCount}):`, message)

      if (errorCount === 3) {
        const errorPayload = { job: jobInfo, status: 'error', result: { errorCode, message } }
        jobs.emit('serverError', { job, producer, payload: errorPayload })
        return errorPayload
      }

    } finally {

      remaining -= interval
      await sleep()

    }

  }

  const timeoutPayload = {
    job: jobInfo,
    status: 'timeout',
    result: { message: 'Poller reached timeout.' }
  }

  jobs.emit('error', { job, producer, message: 'ServerError', payload: timeoutPayload })
  return timeoutPayload

}

module.exports = {

  dataflowJobPoller: async function(job, sfJobId) {

    const coerceReq = { session: job.data.session },
          dfJobEndpoint = sfApi(coerceReq) + '/wave/dataflowjobs/' + sfJobId;

    const ctx = {
      producer: 'salesforce.dataflowJob',
      endpoint: dfJobEndpoint,
      statusPath: 'status',
      startStatus: [ 'Running' ],
      infoStatus: [ 'Queued', 'Warning' ],
      successStatus: [ 'Success' ],
      errorStatus: [ 'Failure' ]
    }

    return pollEndpoint(job, ctx)

  },

  metadataJobPoller: async function(job, sfJobId) {

    const coerceReq = { session: job.data.session },
          mdJobEndpoint = sfApi(coerceReq) + '/metadata/deployRequest/' + sfJobId;

    const ctx = {
      producer: 'salesforce.metadataJob',
      endpoint: mdJobEndpoint,
      statusPath: 'deployResult.status',
      startStatus: [ 'InProgress' ],
      infoStatus: [ 'Pending', 'Canceling' ],
      successStatus: [ 'SucceededPartial', 'Succeeded'],
      errorStatus: [ 'Failed', 'Canceled' ]
    }

    return pollEndpoint(job, ctx)

  }

}
