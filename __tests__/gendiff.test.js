import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name =>
  path.join(__dirname, '..', '__fixtures__', name)

test('nested json diff (stylish)', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(
    getFixturePath('expectedStylish.txt'),
    'utf-8',
  )

  expect(genDiff(file1, file2)).toBe(expected)
})

test('nested yaml diff (stylish)', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = fs.readFileSync(
    getFixturePath('expectedStylish.txt'),
    'utf-8',
  )

  expect(genDiff(file1, file2)).toBe(expected)
})
