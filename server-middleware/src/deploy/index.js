const aws = require('aws-sdk')

const { sfApi } = require('../utilities'),
      { refresh } = require('../auth'),
      { metadataJobPoller } = require('../poller'),
      { deployOptions, awsOptions } = require(appRoot + '/config/app')

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const getDeployStatusEndpoint = function(req, mdJobId, details = true) {
  const basePath = sfApi(req) + '/metadata/deployRequest'
  return !details ? `${basePath}/${mdJobId}` : `${basePath}/${mdJobId}?includeDetails=true`
}

module.exports = async function({ job, template }) {

  try {

    const { session } = job.data,
          sf = refresh(session),
          subfolderKey = `${awsOptions.folders[session.deployBranch]}${template}.zip`;

    const zipStream = s3
      .getObject({ Bucket: awsOptions.name, Key: subfolderKey })
      .createReadStream()

    const mdJob = await sf.metadata.deploy(zipStream, deployOptions),
          endpoint = getDeployStatusEndpoint({ session: session }, mdJob.id, false);

    return await metadataJobPoller(job, mdJob.id)

  } catch (error) {
    console.error(error)
  }

}
