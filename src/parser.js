import fs from 'fs'
import path from 'path'
import parse from './parsers/index.js'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(filepath).slice(1)

  return parse(content, extension)
}

export default parseFile
