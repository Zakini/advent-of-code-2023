import path from 'node:path'
import { loadFileContents, splitIntoLines, sumReducer } from '../helpers'

const solve = (input: string): number => splitIntoLines(input)
  // Grab each set of numbers
  .map(line => {
    const match = line.match(/^Card +\d+:((?: +\d+)*) \|((?: +\d+)*)$/)
    if (match === null) throw new Error(`Failed to parse card. Input: ${input}`)
    return [match[1], match[2]]
  })
  // Convert string of each set of numbers to array of actual numbers
  .map(s => s.map(s => s.split(' ').filter(s => s !== '').map(Number)))
  // Count how many winning number matches there are
  .map(([w, n]) => n.filter(n => w.includes(n)).length)
  // Calculate points for each card
  .map(n => n <= 0 ? 0 : 2 ** (n - 1))
  // Sum points up
  .reduce(sumReducer)

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath))
  console.log(`${fileName}: ${solution}`)
}

await solveFile('example.txt')
await solveFile('input.txt')
