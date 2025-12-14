import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

test('flat json diff', () => {
  const file1Path = getFixturePath('file1.json')
  const file2Path = getFixturePath('file2.json')
  const expected = fs.readFileSync(
    getFixturePath('expected.txt'),
    'utf-8',
  )

  const result = genDiff(file1Path, file2Path)

  expect(result).toBe(expected)
})

test('flat yaml diff', () => {
  const file1Path = getFixturePath('file1.yml')
  const file2Path = getFixturePath('file2.yml')
  const expected = fs.readFileSync(
    getFixturePath('expected.txt'),
    'utf-8',
  )

  const result = genDiff(file1Path, file2Path)

  expect(result).toBe(expected)
})
