import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = Object.entries(value)
    .map(([k, v]) => `${indent}${k}: ${stringify(v, depth + 1)}`)

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n')
}

const formatStylish = (tree, depth = 1) => {
  const indent = ' '.repeat((depth - 1) * 4)
  const signIndent = ' '.repeat((depth - 1) * 4 + 2)

  const lines = tree.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${signIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'removed':
        return `${signIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'unchanged':
        return `${indent}    ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'changed':
        return [
          `${signIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${signIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ]
      case 'nested':
        return `${indent}    ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent}    }`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default tree => `{\n${formatStylish(tree)}\n}`
