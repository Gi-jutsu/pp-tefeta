interface NodeParameters {
  position: Point
  isWalkable?: boolean
}

export default class Node {
  readonly position: Point

  private fValue: number
  private gValue: number
  private hValue: number
  private parent: Node | null
  private isOnClosedList: boolean
  private isOnOpenList: boolean
  private isWalkable: boolean

  constructor({ position, isWalkable }: NodeParameters) {
    this.position = position

    this.fValue = 0
    this.gValue = 0
    this.hValue = 0
    this.parent = null
    this.isOnClosedList = false
    this.isOnOpenList = false
    this.isWalkable = isWalkable || true
  }

  public getFValue(): number {
    return this.fValue
  }

  public getGValue(): number {
    return this.gValue
  }

  public getParent(): Node | null {
    return this.parent
  }

  public getIsOnClosedList(): boolean {
    return this.isOnClosedList
  }

  public getIsOnOpenList(): boolean {
    return this.isOnOpenList
  }

  public getIsWalkable(): boolean {
    return this.isWalkable
  }

  public setFValue(value: number): void {
    this.fValue = value
  }

  public setGValue(value: number): void {
    this.gValue = value
  }

  public setHValue(value: number): void {
    this.hValue = value
  }

  public setParent(node: Node): void {
    this.parent = node
  }

  public setIsOnClosedList(isOnClosedList: boolean): void {
    this.isOnClosedList = isOnClosedList
  }

  public setIsOnOpenList(isOnOpenList: boolean): void {
    this.isOnClosedList = isOnOpenList
  }

  public setIsWalkable(isWalkable: boolean): void {
    this.isWalkable = isWalkable
  }
}