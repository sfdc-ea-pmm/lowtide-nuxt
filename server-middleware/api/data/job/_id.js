const queue = require(appRoot + '/src/queue'),
    { handleSuccess, handleError } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {

    const { jobHistory } = req.session

    try {

      if (!jobHistory.length)
        throw new Error('No jobs found on session.')

      const restJob = await queue.restQueue.getJob(req.params.id),
            deployJob = await queue.deployQueue.getJob(req.params.id),
            timeshiftJob = await queue.timeshiftQueue.getJob(req.params.id);

      const jobResult =
        restJob ? restJob : (
          deployJob ? deployJob : (
            timeshiftJob ? timeshiftJob : null
          )
        )

      if (!jobResult)
        throw new Error(`Job not found with id ${req.params.id}`)

      handleSuccess(res, { data: queue.formatJobResponse(jobResult) })

    } catch (error) {
      return handleError(res, error)
    }

  }

}
