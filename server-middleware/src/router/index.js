/*

  Generate a JSON file which expresses API routes, controllers, and their
  related methods.

  Note: Routes are generated in two batches, static (not ending in a parameter
  like _id) routes are generated first. The express router handles incoming
  requests in order, so we can avoid conflicts where the router interprets
  some additional folder in the path as if it were an id parameter.

*/

const fs = require('fs'),
      path = require('path'),
      dirTree = require('directory-tree'),
      express = require('express'),
    { nanoid } = require('nanoid');

const { required } = require('../auth')

const flattenTree = function(routeArray = [], childArray) {
  for (child of childArray) {
    routeArray.push(path.parse(child.path))
    if(child.children)
      flattenTree(routeArray, child.children)
  } return routeArray
}

const rebuildPaths = function(p) {

  let subDynamic = s => s.replace('_', ':').replace('index', ''),
      subClean = s => s.replace(':', ''),
      testIndex = s => s.startsWith('index');

  const relPath = p.dir.replace(appRoot, ''),
        relPathExApi = relPath.replace('/api', ''),
        nameParts = relPath.split('/'),
        subName = subDynamic(p.name),
        cleanName = subClean(subName);

  const ctrlMethods = require(path.join(appRoot, relPath, p.base));

  nameParts.push(cleanName)

  const pathKey = nameParts.slice(2).filter(p => p).join('-')

  return {
    id: nanoid(10),
    name: pathKey,
    isIndex: testIndex(p.name),
    path: path.join(relPathExApi, subName),
    controller: path.join(relPath, p.base),
    methods: Object.keys(ctrlMethods)
  }

}

const assignRoutes = function(router, routeArray) {
  for(const endpoint of routeArray) {
    const route = router.route(endpoint.path)
    for (const method of endpoint.methods) {
      const controllerPath = path.join(appRoot, endpoint.controller)
      route[method.toLowerCase()](require(controllerPath)[method])
      console.log(`Added route: ${endpoint.path}`)
    }
  } return router
}

const groupByKey =  function(list, key) {
  return list.reduce((hash, obj) => ({ ...hash, [obj[key]]: obj }), {})
}

module.exports = {

  initApi: function (target) {

    target = target || '/api'

    if (process.env.ENVIRONMENT === 'development')
      fs.writeFileSync(appRoot + '/config/routes.json', "{}")

    console.log('\nGenerating API structure...')

    const jsFileRegex = /\.js/,
          apiPath = path.join(appRoot, target),
          filteredTree = dirTree(apiPath, { extensions: jsFileRegex });

    const flatTree = flattenTree([], filteredTree.children)

    pathArray = flatTree
      .filter(d => d.ext.match(jsFileRegex))
      .map(rebuildPaths)

    const routesObject = groupByKey(pathArray, 'name')

    try {

      const routeJson = JSON.stringify(routesObject, null, 2)

      if (process.env.ENVIRONMENT === 'development') {
        fs.writeFileSync(appRoot + '/config/routes.json', routeJson)
        console.log('\nFile written successfully. Generating router instance...')
      }

      let router = express.Router()

      //router.use(required)

      const staticRoutes = [],
            dynamicRoutes = [];

      Object.entries(routesObject).map(([key, endpoint]) => {
        if (endpoint.isIndex) staticRoutes.push(endpoint)
        else dynamicRoutes.push(endpoint)
      })

      console.log('\nAdding static routes (index.js)...\n')
      router = assignRoutes(router, staticRoutes)

      console.log('\nAdding dynamic routes...\n')
      router = assignRoutes(router, dynamicRoutes)

      console.log('\nRouter instance generated successfully.\n')

      return {
        routes: routesObject,
        router: router
      }

    } catch (error) {
      console.error(error)
      console.log('Write failed. Aborting.')
      process.exit(0)
    }

  }

}
