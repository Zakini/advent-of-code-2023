import path from 'node:path'

const solve = (input: string): number =>
  // Split into lines
  input.split('\n')
    // Trim blank lines
    .filter(l => l.trim() !== '')
    // Find digits
    .map(l => l.split('').filter(c => !Number.isNaN(Number(c))))
    // Find calibration values
    .map(l => Number(`${l[0]}${l[l.length - 1]}`))
    // Sum everything up
    .reduce((a, v) => a + v)

const solveFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(import.meta.dir, fileName)
  const file = Bun.file(filePath)
  const solution = solve(await file.text())
  console.log(`${fileName}: ${solution}`)
}

await solveFile('examplePart1.txt')
await solveFile('input.txt')
