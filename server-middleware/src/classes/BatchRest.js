module.exports = class {

  constructor(connection, endpointList, batchSize = 10, sleepMs = 1000) {
    this.connection = connection
    this.endpointList = endpointList
    this.batchSize = batchSize
    this.sleepFor = sleepMs
    this.queryResults = []
  }

  async singleQuery(q) {
    try {
      const result = await this.connection.request(q)
      return { endpoint: q, queryResult: result }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async execute() {

    let sleep = () => new Promise(resolve => setTimeout(resolve, this.sleepFor))

    const batchedList = this.endpointList.reduce((temp, x, i) => {
      const subIndex = Math.floor(i / this.batchSize)
      if(!temp[subIndex])
        temp[subIndex] = []
      temp[subIndex].push(x)
      return temp
    }, [])

    for (const [index, batch] of batchedList.entries()) {
      const batchResult = await Promise.allSettled(batch.map(q => this.singleQuery(q)))
      this.queryResults.push(batchResult)
      await sleep()
    }

  }

  get results() {
    return this.queryResults.flat()
  }

}
