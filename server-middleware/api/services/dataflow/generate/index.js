const { nanoid } = require('nanoid')

const { timeshiftQueue } = require(appRoot + '/src/queue'),
      { refresh } = require(appRoot + '/src/auth'),
      { handleError, handleSuccess } = require(appRoot + '/src/utilities'),
      { Dataflow } = require(appRoot + '/src/classes'),
      { createDataflow } = require(appRoot + '/src/dataflow');

module.exports = {

  POST: async function(req, res) {

    try {

      const jobOptions = { jobId: nanoid(10) },
            jobName = 'generate_timeshift_dataflow',
          { session, params, body } = req;

      const result = await timeshiftQueue.add(jobName, { session, params, body }, jobOptions),
            jobInfo = { jobId: result.id, name: jobName };

      req.session.jobHistory.push(jobInfo)
      handleSuccess(res, { data: jobInfo })

    } catch (error) {
      handleError(res, error)
    }

  }

}
