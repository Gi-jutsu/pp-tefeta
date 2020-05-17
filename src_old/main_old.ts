import { join } from 'path'
import {createReadStream, readFileSync} from 'fs'
import readline from 'readline'

interface MazeDimension {
  columns: Number
  rows: Number
}

const isMazeDimension = (value: any): value is MazeDimension => {
  return value.rows !== undefined && value.columns !== undefined
}

const map = 'rect.01.map'
const mapPath = join('data', 'maps', map)
const content = readFileSync(mapPath)

const parseDimension = (content: string): MazeDimension => {
  const { groups } = content.match(/(?<columns>\d+)x(?<rows>\d+)/) || {}

  if (!groups || !isMazeDimension(groups)) {
    throw Error('Unable to parse dimensions')
  }

  return groups
}

const parseLabyrinth = (content: string): string => {
  return ''
}

const dimension = parseDimension(content.toString())
const labyrinth = parseLabyrinth(content.toString())

const rl = readline.createInterface({
  input: createReadStream(mapPath)
})

let lineCount = 0
rl.on('line', (line) => {
  if (lineCount > 0) {
    console.log(line, lineCount)
  }

  [...line].forEach((index, char) => {
    console.log(index, char)
  })

  lineCount++
})