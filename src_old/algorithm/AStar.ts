import Grid from '../core/Grid'

interface AStarNode extends Node {
  g: number
  f: number
}

export default function AStar(startNode: Node, endNode: any, grid: Grid): void {
  let openList: AStarNode[] = []
  let closedList = []

  openList.push({
    ...startNode,
    g: 0,
    f: 0,
  })

  while(openList.length > 0) {
    const node = openList.pop()

    if (!node) {
      return
    }

    console.log('Current Node:', node)
    const neighbours = grid.getNeighbours(node)
    neighbours.forEach(neighbour => {
      const { xPos, yPos } = neighbour

      const ng = node.g + (( xPos - node.xPos === 0 || yPos - node.yPos) ? 1:Math.SQRT2)
      console.log(ng)
      console.log('neighbour:', neighbour)
    })
  }
}