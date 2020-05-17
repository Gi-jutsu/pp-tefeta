import readline from "readline"
import { createReadStream } from "fs"
import { join } from "path"
import Grid from './core/Grid'
import AStar from './algorithm/AStar'

const map = 'rect.02.map'
const mapPath = join('data', 'maps', map)

const rl = readline.createInterface({
  input: createReadStream(mapPath)
})

let gridMap: Grid
let startPosition: Point
let endPosition: Point

let rowCount = 0
let columnCount = 0

rl.on('line', (line) => {
  // Parse first line to retrieve width & height of map
  if (rowCount === 0) {
    const { groups } = line.match(/(?<width>\d+)x(?<height>\d+)/) || {}

    if (groups) {
      const { width, height } = groups

      gridMap = new Grid({ width: parseInt(width), height: parseInt(height) })
      gridMap.initialize()
    }
  } else {
    line.split('').forEach(char => {
      const nodePosition: Point = { x: columnCount, y: rowCount - 1 }
      const node = gridMap.getNodeAt(nodePosition)

      switch (char) {
        case '*':
          node.setIsWalkable(false)
          break
        case '1':
          startPosition = nodePosition
          break
        case '2':
          if (endPosition === undefined) {
            endPosition = nodePosition
          }
          break
      }

      columnCount++
    })
  }

  rowCount++
  columnCount = 0
})

rl.on('close', () => {
  const aStar = new AStar({ grid: gridMap })

  const path = aStar.findPath(
    startPosition,
    endPosition,
  )

  gridMap.print(path)
})