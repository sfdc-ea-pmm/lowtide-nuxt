const { nanoid } = require('nanoid')

const { restQueue } = require(appRoot + '/src/queue'),
    { handleError, handleSuccess } = require(appRoot + '/src/utilities');

module.exports = {
  GET: async function(req, res) {

    try {

      const jobOptions = { jobId: nanoid(10) },
            jobName = 'dataflow_run',
          { session, params, body } = req;

      const result = await restQueue.add(jobName, { session, params, body }, jobOptions),
            jobInfo = { jobId: result.id, name: jobName };

      req.session.jobHistory.push(jobInfo)
      handleSuccess(res, { data: jobInfo })


    } catch (error) {
      handleError(res, error)
    }

  }
}
