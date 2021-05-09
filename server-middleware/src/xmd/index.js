const { sfApi } = require('../utilities'),
      { refresh } = require('../auth'),
      { BatchRest } = require('../classes');

const parseXmdDates = (d) => {
  console.log(d)
  if (d.status !== 'fulfilled') return
  const { id, totalRows, dataset, xmdMain } = d.value.queryResult
  return {
    id: dataset.id,
    versionId: id,
    connector: xmdMain.dataset.connector,
    name: xmdMain.dataset.fullyQualifiedName,
    rows: totalRows,
    dates: xmdMain.dates
  }
}

module.exports = {

  gatherDateFields: async function(session, idAndVersionArray) {

    const sf = refresh(session),
          coerceReq = { session: session },
          queryEndpoint = sfApi(coerceReq) + '/wave/datasets';

    const endpointList = idAndVersionArray.map(d => {
      return `${queryEndpoint}/${d.Id}/versions/${d.CurrentId}`
    })

    console.log(endpointList)

    const restBatchQuery = new BatchRest(sf, endpointList)
    await restBatchQuery.execute()

    return restBatchQuery.results.map(parseXmdDates)

  }

}
