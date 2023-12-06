import { splitIntoLines } from '../helpers'

export type ScratchCard = {
  id: number,
  winningNumbers: number[],
  cardNumbers: number[],
}

export const parseScratchCards = (input: string): ScratchCard[] => splitIntoLines(input)
  .map((line): ScratchCard => {
    const match = line.match(/^Card +(\d+):((?: +\d+)*) \|((?: +\d+)*)$/)
    if (match === null) throw new Error(`Failed to parse card. Input: ${input}`)

    return {
      id: Number(match[1]),
      winningNumbers: match[2].split(' ').filter(s => s !== '').map(Number),
      cardNumbers: match[3].split(' ').filter(s => s !== '').map(Number),
    }
  })

export const countScratchCardMatches = (card: ScratchCard): number => card.cardNumbers
  .filter(n => card.winningNumbers.includes(n))
  .length
