const queue = require(appRoot + '/src/queue'),
    { handleSuccess, handleError } = require(appRoot + '/src/utilities')

module.exports = {

  GET: async function(req, res) {

    const { jobHistory } = req.session

    try {

      if (!jobHistory.length)
        handleSuccess(res, { data: [] })

      const jobStatuses = [
        'active',
        'wait',
        'delayed',
        'failed',
        'completed'
      ]

      const restJobs = await queue.restQueue.getJobs(jobStatuses),
            deployJobs = await queue.deployQueue.getJobs(jobStatuses),
            timeshiftJobs = await queue.timeshiftQueue.getJobs(jobStatuses);

      const allJobs = restJobs.concat(deployJobs, timeshiftJobs)

      const jobList = allJobs
        .filter(d => jobHistory.map(d => d.jobId).includes(d.id))
        .map(queue.formatJobResponse)

      handleSuccess(res, { data: jobList })

    } catch (error) {
      return handleError(res, error)
    }

  }

}
