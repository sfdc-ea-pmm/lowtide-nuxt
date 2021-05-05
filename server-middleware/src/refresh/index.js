const { sfApi } = require('../utilities'),
      { refresh } = require('../auth'),
      { RefreshQuery, BatchQuery } = require('../classes');

const recurseQuery = async (batchQueryObject) => {

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

    if (hasStale) {
      console.log(`${staleCount} stale Dataset(s). Sleeping for 1 minute...`)
      await sleep(60000)
    } else {
      console.log(`All datasets successfully queried.`)
      return batchQueryObject.results
    }

    loopCount++

    if (loopCount >= 10)
      throw new Error('Loop count exceeded limit.')

  }

}

module.exports = async function (job) {

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
      .map(d =>  new RefreshQuery(d.Id, d.CurrentId))

    const batchQuery = new BatchQuery(sf, queryEndpoint, refreshQueries)

    try {
      const doneResults = await recurseQuery(batchQuery)
      console.log(doneResults)
    } catch (error) {
      console.error(error.message)
    }

    return


}
