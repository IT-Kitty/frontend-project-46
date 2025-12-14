import parseFile from './src/parser.js'
import buildDiff from './src/buildDiff.js'
import formatStylish from './src/formatters/stylish.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diff = buildDiff(data1, data2)

  if (format === 'stylish') {
    return formatStylish(diff)
  }

  throw new Error(`Unknown format: ${format}`)
}

export default genDiff
