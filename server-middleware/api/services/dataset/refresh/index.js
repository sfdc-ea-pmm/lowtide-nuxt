const { nanoid } = require('nanoid')

const { timeshiftQueue } = require(appRoot + '/src/queue'),
    { handleError, handleSuccess } = require(appRoot + '/src/utilities');

module.exports = {
  GET: async function(req, res) {

    try {

      const jobOptions = { jobId: nanoid(10) },
            jobName = 'refresh_stale_datasets',
          { session, params, body } = req;

      const result = await timeshiftQueue.add(jobName, { session }, jobOptions),
            jobInfo = { jobId: result.id, name: jobName };

      req.session.jobHistory.push(jobInfo)
      handleSuccess(res, { data: jobInfo })


    } catch (error) {
      handleError(res, error)
    }

  }
}
