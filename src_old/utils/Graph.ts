interface Node {

}

export default class Graph<T> {
  private nodes: Array<T> = []
  private edges: Map<T, T[]> = new Map()
  private size: number = 0

  addNode(value: T) {
    this.nodes.push(value)
    this.size++
  }

  removeNode(value: T) {

  }
}