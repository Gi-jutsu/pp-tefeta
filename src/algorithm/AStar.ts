import _ from 'lodash'
import Grid from '../core/Grid'
import Node from '../core/Node'
import calculateHeuristic, { Heuristic } from '../core/heuristic'
import { backtrace } from '../core/util'

interface AStarParameters {
  grid: Grid
  heuristic?: Heuristic
}

export default class AStar {
  private grid: Grid
  private closedList: Node[] = []
  private openList: Node[] = []
  private heuristic: Heuristic
  private weight: number = 1

  constructor({ grid, heuristic }: AStarParameters) {
    this.grid = grid
    this.heuristic = heuristic || 'Manhatten'
  }

  // @ts-ignore
  public findPath(startPosition: Point, endPosition: Point): Node[] {
    const startNode = this.grid.getNodeAt(startPosition)
    const endNode = this.grid.getNodeAt(endPosition)

    startNode.setIsOnOpenList(true)
    this.openList.push(startNode)

    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        const node = this.grid.getNodeAt({ x, y })

        if (!node.getIsWalkable()) {
          node.setFValue(0)
          node.setGValue(0)
          node.setHValue(0)

          node.setIsOnClosedList(true)
          this.closedList.push(node)
        } else {
          node.setHValue(
            calculateHeuristic(
              this.heuristic,
              node.position,
              endNode.position,
              this.weight,
            )
          )
        }
      }
    }

    while (this.openList.length !== 0) {
      const node = _.minBy(this.openList, (item) => {
        return item.getFValue()
      })

      if (!node) {
        throw Error('Unable to find Node with smallest F Value')
      }

      _.remove(this.openList, node)
      this.closedList.push(node)
      node.setIsOnOpenList(false)
      node.setIsOnClosedList(true)

      if (node === endNode) {
        return backtrace(endNode)
      }

      const neighbours = this.grid.getNeighbours(node)
      neighbours.forEach((neighbour) => {
        if (neighbour.getIsOnClosedList()) {
          return
        }

        const { x, y } = neighbour.position

        const gValue = node.getGValue() + ((x !== node.position.x || y !== node.position.y) ? this.weight : this.weight * Math.SQRT2)

        if (gValue < neighbour.getGValue()) {
          neighbour.setGValue(gValue)
          neighbour.setParent(node)
        }

        if (!neighbour.getIsOnOpenList()) {
          neighbour.setGValue(gValue)
          neighbour.setParent(node)
          neighbour.setIsOnOpenList(true)

          this.openList.push(neighbour)
        }

        if (neighbour.getIsOnOpenList() || gValue > neighbour.getGValue()) {
          neighbour.setParent(node)
        }
      })
    }
  }
}