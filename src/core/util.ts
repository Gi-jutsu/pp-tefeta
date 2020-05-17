import Node from './Node'

export function backtrace(node: Node) {
  let result: Node[] = []
  let currentNode = node

  while (currentNode.getParent() !== null) {
    result.push(currentNode)

    const parent = currentNode.getParent()
    if (parent !== null) {
      currentNode = parent
    }
  }

  result.push(currentNode)

  return result.reverse()
}