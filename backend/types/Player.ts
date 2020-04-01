import { User } from './User'

export class Player extends User {
  constructor(
    id: number,
    name: string,
    active: boolean,
    readonly rating: number,
    readonly initialRating: number,
  ) {
    super(id, name, active)
  }
}

export const NULL_PLAYER = new Player(null, null, null, null, null)
