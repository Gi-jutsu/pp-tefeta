export default class Grid {
  private nodes: Node[][] = []

  private startNode: Node = { xPos: 0, yPos: 0, isWalkable: true }
  private endNode: Node = { xPos: 0, yPos: 0, isWalkable: true }

  private width: number = 0
  private height: number = 0

  setWidth(width: number) {
    this.width = width
  }

  setHeight(height: number) {
    this.height = height
  }

  setStartNode(node: Node): void {
    this.startNode = node
  }

  setEndNode(node: Node): void {
    this.endNode = node
  }

  getStartNode(): Node {
    return this.startNode
  }

  getEndNode(): Node {
    return this.endNode
  }

  initialize(): void {
    for (let y = 0; y < this.height; y++) {
      this.nodes[y] = []
      for (let x = 0; x < this.width; x++) {
        this.nodes[y][x] =  { xPos: 0, yPos: 0, isWalkable: true }
      }
    }
  }

  getNeighbours(node: Node): Node[] {
    let neighbours: Node[] = []
    const { xPos, yPos } = node

    // ↑
    const topNode = this.nodes[yPos - 1][xPos]
    if (topNode && topNode.isWalkable) {
      neighbours.push(topNode)
    }

    // →
    const rightNode = this.nodes[yPos][xPos + 1]
    if (rightNode && rightNode.isWalkable) {
      neighbours.push(rightNode)
    }

    // ↓
    const bottomNode = this.nodes[yPos + 1][xPos]
    if (bottomNode && bottomNode.isWalkable) {
      neighbours.push(bottomNode)
    }

    // ←
    const leftNode = this.nodes[yPos][xPos - 1]
    if (leftNode && leftNode.isWalkable) {
      neighbours.push(leftNode)
    }

    return neighbours
  }

  print(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++ ) {
        const node = this.nodes[y][x]

        if (node === this.startNode) {
          process.stdout.write((node.isWalkable) ? '1':'*')
        } else if (node === this.endNode) {
          process.stdout.write((node.isWalkable) ? '2':'*')
        } else {
          process.stdout.write((node.isWalkable) ? ' ':'*')
        }
      }

      process.stdout.write('\n')
    }
  }

  addNode(node: Node): void {
    this.nodes[node.yPos][node.xPos] = node
  }
}