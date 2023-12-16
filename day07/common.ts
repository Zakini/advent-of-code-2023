const possibleCards = [
  'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'
] as const
export type Card = typeof possibleCards[number]

export type Hand = {
  cards: Card[],
  bid: number,
}

export const typeRankingMap = {
  'five of a kind':  7,
  'four of a kind':  6,
  'full house':      5,
  'three of a kind': 4,
  'two pair':        3,
  'one pair':        2,
  'high card':       1,
} as const

export type HandType = keyof typeof typeRankingMap

const isCard = (v: string): v is Card => possibleCards.includes(v as Card)

export const parseLine = (line: string): Hand => {
  const [rawCards, rawBid] = line.split(' ')

  const cards = rawCards.split('').filter(isCard)
  if (cards.length !== 5) throw new Error(`Got a ${cards.length} card hand. All hands must contain 5 cards. Line: ${line}`)

  const bid = Number(rawBid)
  if (isNaN(bid)) throw new Error(`Invalid bid: ${bid}. Line: ${line}`)

  return { cards, bid }
}

type HandTypeFinder = (h: Hand) => HandType
type CardValueMap = Record<Card, number>
export const handComparerFactory = (findHandType: HandTypeFinder, cardValueMap: CardValueMap) =>
  (a: Hand, b: Hand): number => {
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
