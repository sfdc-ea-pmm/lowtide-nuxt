const { sfApi } = require('../utilities'),
      { refresh } = require('../auth'),
      { dataflowJobPoller } = require('../poller'),
      { gatherDateValues } = require('../refresh'),
      { BatchQuery, LatestDateQuery, Dataflow } = require('../classes');

const mergeBranches = (branchArray) => {
  const def = {}
  for (const b of branchArray) {
    Object.assign(def, b.object)
  } return def
}

const createNames = (label) => {

  const mainLabel = label.trim(),
        mainDevName = label.replace(/[^a-z^A-Z]/g, '_'),
        primerLabel = `PRIMER ${mainLabel}`,
        primerDevName = 'ltts_primer_' + mainDevName;

  return {
    mainLabel,
    mainDevName,
    primerLabel,
    primerDevName
  }

}

const suggestDates = (dateArray) => {

}


module.exports = (function () {

  const methods = {}

  methods.getDataflowEndpoint = function(req, dataflowId) {
    const basePath = sfApi(req) + '/wave/dataflows'
    return dataflowId ? `${basePath}/${dataflowId}` : basePath
  },

  methods.getDataflowJobsEndpoint = function(req, dataflowJobId) {
    const basePath = sfApi(req) + '/wave/dataflowjobs'
    return dataflowJobId ? `${basePath}/${dataflowJobId}` : basePath
  },

  methods.createDataflow = async function(session, {
    DeveloperName,
    MasterLabel,
    State = 'Active',
    DataflowDefinition = {}
  }) {

    const sf = refresh(session)

    const dataflowResult = await sf.sobject('Dataflow').create({
      DeveloperName,
      MasterLabel,
      State
    })

    const versionResult = await sf.sobject('DataflowVersion').create({
      DataflowId: dataflowResult.id,
      DataflowDefinition
    })

    const assignResult = await sf.sobject('Dataflow').update({
      Id: dataflowResult.Id,
      CurrentId: versionResult.Id
    })

    return { dataflowResult, versionResult, assignResult }

  },



  methods.generateTimeshiftDataflow = async function(job) {

    let mergeBranches = (branchArray) => {
      const def = {}
      for (const b of branchArray) {
        Object.assign(def, b.object)
      } return def
    }

    const { session } = job.data,
          { dataflowLabel, datasetArray } = job.data.body;

    /* For each dataset field, gather the latest date. */

    try {

      const latestDates = await gatherDateValues(job)      
      const dfNames = createNames(dataflowLabel)

      // const primerDataflow = methods.createDataflow(session, {
      //   DeveloperName: dfNames.primerDevName,
      //   DeveloperLabel: dfNames.primerLabel,
      //   DataflowDefinition: {}
      // })
      //
      // const mainDataflow = methods.createDataflow(session, {
      //   DeveloperName: dfNames.mainDevName,
      //   DeveloperLabel: dfNames.mainLabel,
      //   DataflowDefinition: {}
      // })

      return { message: 'Finished!', data: result }

    } catch (error) {
      console.error(error.message)
      return { message: error.message }
    }

  },

  methods.runDataflow = async function({ session, job, dataflowId }) {

    const jobsEndpoint = methods.getDataflowJobsEndpoint({ session: session }),
          sf = refresh(session);

    try {

      const commandResult = await sf.requestPost(jobsEndpoint, {
        dataflowId: dataflowId,
        command: 'start'
      })

      return await dataflowJobPoller(job, commandResult.id)

    } catch (error) {
      const { errorCode, message } = error
      if (errorCode === '123')
        return { errorCode, message: message + '. Is dataflow Active?' }
      return { errorCode, message }
    }

  },

  /* Async delete - can be queued by job framework */

  methods.deleteDataflow = async function({ job, dataflowId }) {

    const { session, ...rest } = job.data, jobInfo = {
        id: job.id,
        name: job.name,
        queue: job.queue.name,
        context: rest
      };

    const sf = refresh(session)

      try {
        const result = await sf.sobject('Dataflow').destroy(dataflowId)
        const successPayload = { job: jobInfo, status: 'success', result: result }
        jobs.emit('jobSuccess', { job, producer, message: 'success', payload: successPayload })
        return successPayload
      } catch (error) {
        const { errorCode, message } = error
        const errorPayload = { job: jobInfo, status: 'error', result: { errorCode, message } }
        jobs.emit('jobError', { job, producer, message: 'error', payload: errorPayload })
        return errorPayload
      }

  }

  return methods

})();
