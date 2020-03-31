export interface GameData {
  readonly name: string;
  readonly description: string;
}

export class Game {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
  ) {}
}
