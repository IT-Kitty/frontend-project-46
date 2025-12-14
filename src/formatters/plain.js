import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (value === null) {
    return 'null'
  }
  return String(value)
}

const formatPlain = (tree, parentPath = '') => {
  const lines = tree
    .filter(node => node.type !== 'unchanged')
    .flatMap((node) => {
      const propertyPath = parentPath
        ? `${parentPath}.${node.key}`
        : node.key

      switch (node.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${propertyPath}' was removed`
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
        case 'nested':
          return formatPlain(node.children, propertyPath)
        default:
          return []
      }
    })

  return lines.join('\n')
}

export default formatPlain
