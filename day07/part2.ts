import { fileSolverFactory, sortDesc, sortNum, splitIntoLines, sumReducer } from '../helpers'
import { Card, Hand, HandType, handComparerFactory, parseLine, typeRankingMap } from './common'

const cardValueMap = {
  'A': 14, 'K': 13, 'Q': 12,
  'T': 10, '9':  9, '8':  8, '7':  7,
  '6':  6, '5':  5, '4':  4, '3':  3,
  '2':  2, 'J':  1,
} as const

export const findHandType = (hand: Hand): HandType => {
  const cardCounts = hand.cards.reduce<Partial<Record<Card, number>>>(
    (a, c) => ({ ...a, [c]: (a[c] ?? 0) + 1 }),
    {},
  )
  const uniqueCards = Object.keys(cardCounts)
  const highestCount = Object.values(cardCounts).sort(sortDesc(sortNum))[0]
  const jokerCount = cardCounts['J'] ?? 0
  const hasJokers = jokerCount > 0

  if (uniqueCards.length === 1) return 'five of a kind'

  if (uniqueCards.length === 2) {
    if (hasJokers) return 'five of a kind'
    return highestCount === 4 ? 'four of a kind' : 'full house'
  }

  if (uniqueCards.length === 3) {
    if (hasJokers) {
      if (highestCount === 3) return 'four of a kind'
      return jokerCount === 2 ? 'four of a kind' : 'full house'
    }
    return highestCount === 3 ? 'three of a kind' : 'two pair'
  }

  if (uniqueCards.length === 4) {
    if (hasJokers) return 'three of a kind'
    return 'one pair'
  }

  if (hasJokers) return 'one pair'
  return 'high card'
}

const compareHands = handComparerFactory(findHandType, cardValueMap)

const solve = (input: string): number => splitIntoLines(input)
  .map(parseLine)
  .sort(compareHands)
  .map((h, i) => h.bid * (i + 1))
  .reduce(sumReducer)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')
