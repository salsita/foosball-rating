export interface GameData {
  readonly name: string;
  readonly description: string;
}

export interface Game extends GameData {
  readonly id: number;
}
