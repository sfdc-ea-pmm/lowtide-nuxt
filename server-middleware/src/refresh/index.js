const { sfApi } = require('../utilities'),
      { refresh } = require('../auth'),
      { RefreshQuery, LatestDateQuery, BatchQuery } = require('../classes');

const parseDates = (resultsObject) => {
  return resultsObject.map(d => {
    if (!d.value) return
    return {
      datasetId: d.value.datasetId,
      datasetVersionId: d.value.datasetVersionId,
      latestDate: d.value.queryResult.results.records[0].__Latest_YMD,
    }
  })
}

const recurseQuery = async function (job, batchQueryObject, isDateQuery = true, waitTime = 30) {

  let hasStale = true, loopCount = 0;
  let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  let checkStale = (d) => {
    return (d.status === 'rejected' && d.reason.errorCode === '308')
  }

  while (hasStale) {

    let staleCount = 0
    await batchQueryObject.execute()
    const roundResults = batchQueryObject.results.map(checkStale)

    hasStale = roundResults.includes(true)

    /*

      Add socket messages using batchQueryObject.results to show success/pending.

    */

    if (hasStale) {
      roundResults.forEach(d => { if (d === true) staleCount++; })
      console.log(`Found ${staleCount} stale Dataset(s). Sleeping...`)
      if (isDateQuery)
        jobs.emit('jobInfo', {
          job,
          producer: 'lowtide.timeshift',
          message: 'Waiting for dataset refresh.',
          payload: parseDates(batchQueryObject.results)
        })
      await sleep(waitTime * 1000)
    } else {
      console.log(`All datasets successfully queried.`)
      if (isDateQuery)
        jobs.emit('jobInfo', {
          job,
          producer: 'lowtide.timeshift',
          message: 'Finished.',
          payload: parseDates(batchQueryObject.results)
        })
      return parseDates(batchQueryObject.results)
    }

    loopCount++

    if (loopCount >= 10)
      throw new Error('Exceeded retry limit. Aborting!')

  }

}

const simpleRefresh = async function (job) {

  const { session, ...rest } = job.data, jobInfo = {
      id: job.id,
      name: job.name,
      queue: job.queue.name,
      context: rest
    };

    const sf = refresh(session),
          coerceReq = { session: job.data.session },
          queryEndpoint = sfApi(coerceReq) + '/wave/query';

    const todayDate = new Date(),
          backThirty = new Date(todayDate.setDate(todayDate.getDate() - 30));

    /* Function to exclude recently refreshed datasets. */

    let needsRefresh = (dataset) => {
      const checkFields = [ 'LastQueriedDate', 'DataRefreshDate'],
            checkResults = [];
      for (const field of checkFields) {
        const fieldDate = new Date(dataset[field])
        if (fieldDate < backThirty)
          checkResults.push(true)
      } return checkResults.includes(true)
    }

    const orgDatasets = await sf.sobject('Edgemart').find()

    const refreshQueries = orgDatasets
      .filter(needsRefresh)
      .map(d => new RefreshQuery(d.Id, d.CurrentId))

    const batchQuery = new BatchQuery(sf, queryEndpoint, refreshQueries)

    try {
      const doneResults = await recurseQuery(job, batchQuery)
      console.log(doneResults)
    } catch (error) {
      console.error(error.message)
    }

    return

}

const gatherDateValues = async function (job) {

  const { session, ...rest } = job.data, jobInfo = {
      id: job.id,
      name: job.name,
      queue: job.queue.name,
      context: rest
    };

    const { body } = job.data

    const sf = refresh(session),
          coerceReq = { session: session },
          queryEndpoint = sfApi(coerceReq) + '/wave/query';

    const ldQueries = body.datasetArray.map(d => {
      return d.dateFields.map(f => {
        return new LatestDateQuery({
          datasetId: d.id,
          datasetVersionId: d.versionId,
          fieldApiName: f
        })
      })
    }).flat()

    const batchQuery = new BatchQuery(sf, job, queryEndpoint, ldQueries)

    try {
      const doneResults = await recurseQuery(job, batchQuery)
      return doneResults
    } catch (error) {
      console.error(error.message)
      return { error: error.message }
    }

}

module.exports = {
  simpleRefresh,
  gatherDateValues
}
