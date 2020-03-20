export interface GameData {
  readonly name: string;
  readonly description: string;
}

export const isGameData = (data: unknown): data is GameData => {
  const test = data as GameData
  return test.name !== undefined && test.name !== null &&
  test.description !== null && test.description !== null
}

export interface Game extends GameData {
  readonly id: number;
}
