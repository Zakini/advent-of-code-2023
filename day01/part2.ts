import path from 'node:path'
import { loadFileContents, splitIntoLines, sumReducer } from '../helpers'

const textDigitMap = {
  one:   '1', two:   '2', three: '3',
  four:  '4', five:  '5', six:   '6',
  seven: '7', eight: '8', nine:  '9',
}

type TextDigit = keyof typeof textDigitMap

const isTextDigit = (v: string): v is TextDigit =>
  Object.keys(textDigitMap).includes(v)

const solve = (input: string): number => {
  const lines = splitIntoLines(input)

  const calibrationValues: number[] = []

  for (const line of lines) {
    const digits: string[] = []

    // Text digit, or actual 0-9 digit
    const regex = new RegExp(
      [...Object.keys(textDigitMap), '[0-9]'].join('|'),
      // Global regex so we can use lastIndex
      'g',
    )

    let match = null
    do {
      match = regex.exec(line)

      if (match !== null) {
        digits.push(
          isTextDigit(match[0])
            ? textDigitMap[match[0]]
            : match[0]
        )

        // Continue from the index after the start of the match
        // This handles cases where text digits overlap e.g. twone
        regex.lastIndex = match.index + 1
      }
    } while (match !== null)

    calibrationValues.push(Number(`${digits[0]}${digits[digits.length - 1]}`))
  }

  return calibrationValues.reduce(sumReducer)
}

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const solution = solve(await loadFileContents(filePath))
  console.log(`${fileName}: ${solution}`)
}

await solveFile('examplePart2.txt')
await solveFile('input.txt')
