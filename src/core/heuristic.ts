export type Heuristic = 'Manhatten' | 'Euclidean' | 'Chebyshev' | 'Octile'

export default function calculateHeuristic(
  heuristic: Heuristic,
  firstPos: Point,
  secondPos: Point,
  weight: number,
): number {
  const dx = Math.abs(firstPos.x - secondPos.x)
  const dy = Math.abs(firstPos.y - secondPos.y)

  switch (heuristic) {
    case 'Manhatten':
      return (dx + dy) * weight
    default:
      throw Error(`Unknown heuristic function: ${heuristic}`)
  }
}