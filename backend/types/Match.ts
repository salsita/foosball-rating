import { UserInMatches } from './User'
import { Player } from './Player'
import { InputError } from '../errors/InputError'

export class Match {
  constructor(
    readonly team1: Array<Player>,
    readonly team2: Array<Player>,
    readonly team1Won: boolean,
    readonly date: Date,
    readonly winningTeamRatingChange: number,
    readonly losingTeamRatingChange: number,
    readonly gameId: number
  ) {
    if (team1.length < 1 ||
        team1.length > 2 ||
        team2.length < 1 ||
        team2.length > 2) {
      throw new InputError('Inserting teams with unsupported number of players')
    }
  }
}

export class MatchWithId {
  constructor(
    readonly id: number,
    readonly team1: UserInMatches[],
    readonly team2: UserInMatches[],
    readonly team1Won: boolean,
    readonly date: Date,
    readonly winningTeamRatingChange: number,
    readonly losingTeamRatingChange: number,
  ) {}
}
