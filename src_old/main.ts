import { join } from 'path'
import {createReadStream, readFileSync} from 'fs'
import readline from 'readline'
import Grid from './core/Grid'
import AStar from './algorithm/AStar'

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

interface Cell {
  x: number
  y: number
}

let column = 0
let row = 0
const grid = new Grid()

rl.on('line', (line) => {
  if (row === 0) {
    // Parse Grid Dimension
    const { groups } = line.match(/(?<width>\d+)x(?<height>\d+)/) || {}

    if (groups) {
      const { width, height } = groups

      grid.setHeight(parseInt(height))
      grid.setWidth(parseInt(width))

      grid.initialize()
    }
  } else {
    console.log(line);

    [...line].forEach(char => {
      const node = {
        xPos: column,
        yPos: row - 1,
        isWalkable: char !== '*',
      }

      if (char === '1') {
        grid.setStartNode(node)
      }

      if (char === '2') {
        grid.setEndNode(node)
      }

      grid.addNode(node)
      column++
    })
  }

  row++
  column = 0
})

rl.on('close', () => {
  console.log('\n\n Printing Grid \n ___________________')
  grid.print()

  AStar(grid.getStartNode(), grid.getEndNode(), grid)
})