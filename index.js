import _ from 'lodash'
import parseFile from './src/parser.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  // Все ключи из обоих объектов
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  const lines = keys.flatMap((key) => {
    const hasKey1 = _.has(data1, key)
    const hasKey2 = _.has(data2, key)

    if (hasKey1 && hasKey2) {
      if (data1[key] === data2[key]) {
        return `    ${key}: ${data1[key]}`
      }

      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`,
      ]
    }

    if (hasKey1) {
      return `  - ${key}: ${data1[key]}`
    }

    return `  + ${key}: ${data2[key]}`
  })

  return [
    '{',
    ...lines,
    '}',
  ].join('\n')
}

export default genDiff
