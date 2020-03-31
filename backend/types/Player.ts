import { User } from './User'

export class PlayerData {
  constructor(
    readonly initialRating: number,
    readonly userId: number,
    readonly gameId: number,
  ) {}
}

export class Player extends User {
  constructor(
    id: number,
    name: string,
    readonly rating: number,
    active: boolean,
    readonly initialRating: number,
  ) {
    super(id, name, active)
  }
}

export const NULL_PLAYER = new Player(null, null, null, null, null)
