const { nanoid } = require('nanoid')

const { deployQueue } = require(appRoot + '/src/queue'),
      { handleError, handleSuccess } = require(appRoot + '/src/utilities');

module.exports = {

  POST: async function(req, res) {

    try {

      const createdJobs = [],
            jobName = 'template_deploy',
          { session, body: templateKeys } = req;

      for (const template of templateKeys) {
        const jobOptions = { jobId: nanoid(10) }
        const result = await deployQueue.add(jobName, { session, template }, jobOptions)
        createdJobs.push({ jobId: result.id, name: jobName })
      }

      req.session.jobHistory.push(...createdJobs)
      handleSuccess(res, { data: createdJobs })

    } catch (error) {
      handleError(res, error)
    }

  }

}
