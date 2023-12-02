export const loadFileContents = async (filePath: string): Promise<string> =>
  Bun.file(filePath).text()

export const splitIntoLines = (input: string): string[] =>
  input.split('\n')
    // Trim blank lines
    .filter(l => l.trim() !== '')
