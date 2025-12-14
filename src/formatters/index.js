import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
}

const format = (tree, formatName) => {
  const formatter = formatters[formatName]

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }

  return formatter(tree)
}

export default format
