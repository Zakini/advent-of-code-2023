import { fileSolverFactory, splitIntoLines, sumReducer } from '../helpers'

const cardValueMap = {
  'A': 14, 'K': 13, 'Q': 12, 'J': 11,
  'T': 10, '9':  9, '8':  8, '7':  7,
  '6':  6, '5':  5, '4':  4, '3':  3,
  '2':  2,
} as const

const typeRankingMap = {
  'five of a kind':  7,
  'four of a kind':  6,
  'full house':      5,
  'three of a kind': 4,
  'two pair':        3,
  'one pair':        2,
  'high card':       1,
} as const

type Card = keyof typeof cardValueMap
type Hand = {
  cards: Card[],
  bid: number,
}
type HandType = keyof typeof typeRankingMap

type Sorter<T> = (a: T, b: T) => number

const isCard = (v: string): v is Card => Object.keys(cardValueMap).includes(v)

const parseLine = (line: string): Hand => {
  const [rawCards, rawBid] = line.split(' ')

  const cards = rawCards.split('').filter(isCard)
  if (cards.length !== 5) throw new Error(`Got a ${cards.length} card hand. All hands must contain 5 cards. Line: ${line}`)

  const bid = Number(rawBid)
  if (isNaN(bid)) throw new Error(`Invalid bid: ${bid}. Line: ${line}`)

  return { cards, bid }
}

const sortNum = (a: number, b: number): number => a - b
const sortDesc = <T>(sorter: Sorter<T>): Sorter<T> => (a, b) => sorter(b, a)

const findHandType = (hand: Hand): HandType => {
  const cardCounts = hand.cards.reduce<Partial<Record<Card, number>>>(
    (a, c) => ({ ...a, [c]: (a[c] ?? 0) + 1 }),
    {},
  )
  const uniqueCards = Object.keys(cardCounts)
  const highestCount = Object.values(cardCounts).sort(sortDesc(sortNum))[0]

  if (uniqueCards.length === 1) return 'five of a kind'
  if (uniqueCards.length === 2) return highestCount === 4 ? 'four of a kind' : 'full house'
  if (uniqueCards.length === 3) return highestCount === 3 ? 'three of a kind' : 'two pair'
  if (uniqueCards.length === 4) return 'one pair'
  return 'high card'
}

const compareHands = (a: Hand, b: Hand): number => {
  const aType = findHandType(a)
  const bType = findHandType(b)
  const typeDiff = typeRankingMap[aType] - typeRankingMap[bType]
  if (typeDiff !== 0) return typeDiff

  for (let i = 0; i < 5; i++) {
    const aValue = cardValueMap[a.cards[i]]
    const bValue = cardValueMap[b.cards[i]]
    const valueDiff = aValue - bValue
    if (valueDiff !== 0) return valueDiff
  }

  return 0
}

const solve = (input: string): number => splitIntoLines(input)
  .map(parseLine)
  .sort(compareHands)
  .map((h, i) => h.bid * (i + 1))
  .reduce(sumReducer)

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')
