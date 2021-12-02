const fs = require('fs')
const { parseEnvFile, mergeReducedObject } = require('./util')

;(function () {
  const files = fs.readdirSync('.')

  const envFiles = files.filter((file) => file.startsWith('.env'))
  const data = envFiles.map(parseEnvFile)

  const mergedData = data.reduce(mergeReducedObject, data)
  process.env = { ...process.env, ...mergedData }
})()
