const { handleSuccess, handleError } = require(appRoot + '/src/utilities')

module.exports = {
  GET: async function(req, res) {

    const { branch } = req.params,
          cleanBranch = branch.toLowerCase().trim();

    try {

      if (!['master', 'beta'].includes(cleanBranch))
        throw new Error(`${cleanBranch} is not acceptable. Accepts: [beta|master].`)

      req.session.deployBranch = cleanBranch
      req.session.save()

      handleSuccess(res, {
        data: { 
          message: `Success. Changed branch to ${cleanBranch}.`
        }
      })

    } catch (e) {
      console.error(e)
      handleError(res, e)
    }

  }
}
