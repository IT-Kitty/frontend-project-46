import _ from 'lodash'

const isObject = value =>
  _.isPlainObject(value)

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] }
    }

    const val1 = data1[key]
    const val2 = data2[key]

    if (isObject(val1) && isObject(val2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(val1, val2),
      }
    }

    if (!_.isEqual(val1, val2)) {
      return {
        key,
        type: 'changed',
        oldValue: val1,
        newValue: val2,
      }
    }

    return { key, type: 'unchanged', value: val1 }
  })
}

export default buildDiff
