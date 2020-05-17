interface Node<T> {
  value: T
  previous: Node<T> | null
}

export default class Stack<T> {
  private top: Node<T> | null = null
  private size: number = 0

  push(value: T): Node<T> {
    this.top = {
      value,
      previous: this.top,
    }
    this.size++


    return this.top
  }

  pop() {
    if (!this.top) {
      throw Error('Empty Stack')
    }

    const node = this.top

    this.top = this.top.previous
    this.size--

    return node
  }

  isEmpty(): boolean {
    return this.top === null && this.size === 0
  }
}