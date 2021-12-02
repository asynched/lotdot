const fs = require('fs')

const mergeReducedObject = (accumulator, current) => {
  return { ...accumulator, ...current }
}

const isString = (value) => {
  return value.startsWith(`"`) || value.startsWith(`'`)
}

const isNumber = (value) => {
  return !isNaN(+value)
}

const isPrimitive = (value) => {
  if (value === 'null') return true
  if (value === 'true') return true
  if (value === 'false') return true
  return false
}

const generateEnvDataFromFileLines = (data, currentLine) => {
  const [key, value] = currentLine.split('=')
  data[key] = isString(value)
    ? value.replace(/('|")/g, '')
    : isNumber(value)
    ? +value
    : isPrimitive(value)
    ? eval(value)
    : value

  return data
}

const parseEnvFile = (envFile) => {
  const file = fs.readFileSync(envFile, 'utf8')
  const lines = file.split('\n').filter(Boolean)
  const data = lines.reduce(generateEnvDataFromFileLines, {})
  return data
}

module.exports = {
  mergeReducedObject,
  isString,
  isNumber,
  isPrimitive,
  generateEnvDataFromFileLines,
  parseEnvFile,
}
