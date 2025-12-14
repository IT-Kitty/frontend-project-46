import parseFile from './src/parser.js'
import buildDiff from './src/buildDiff.js'
import format from './src/formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diff = buildDiff(data1, data2)

  return format(diff, formatName)
}

export default genDiff
