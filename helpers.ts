import path from 'node:path'

export const loadFileContents = async (filePath: string): Promise<string> =>
  Bun.file(filePath).text()

export const splitIntoLines = (input: string): string[] =>
  input.split('\n')
    // Trim blank lines
    .filter(l => l.trim() !== '')

export const sumReducer = (a: number, v: number): number => a + v

type ParametersExceptFirst<F> =
  F extends (arg0: any, ...rest: infer R) => any ? R : never;

type Solver = (input: string, ...args: any[]) => any

export const fileSolverFactory = <T extends Solver>(dir: string, solver: T) =>
  async (fileName: string, ...solverArgs: ParametersExceptFirst<T>): Promise<void> => {
    const filePath = path.join(dir, fileName)
    const solution = solver(await loadFileContents(filePath), ...solverArgs)
    console.log(`${fileName}: ${solution}`)
  }

type Sorter<T> = (a: T, b: T) => number
export const sortNum = (a: number, b: number): number => a - b
export const sortDesc = <T>(sorter: Sorter<T>): Sorter<T> => (a, b) => sorter(b, a)
