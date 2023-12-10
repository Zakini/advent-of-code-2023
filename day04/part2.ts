import { fileSolverFactory, sumReducer } from '../helpers'
import { ScratchCard, countScratchCardMatches, parseScratchCards } from './common'

type CopyableScratchCard = ScratchCard & {
  copies: number,
}

const solve = (input: string): number => {
  const cards = parseScratchCards(input)
    .map((c): CopyableScratchCard => ({ ...c, copies: 1 }))

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const matches = countScratchCardMatches(card)
    for (let j = 1; j <= matches; j++) {
      cards[i + j].copies += card.copies
    }
  }

  return cards.map(c => c.copies).reduce(sumReducer)
}

const solveFile = fileSolverFactory(import.meta.dir, solve)

await solveFile('example.txt')
await solveFile('input.txt')
