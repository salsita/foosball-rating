import { UserInMatches } from './User'

export class Match {
  readonly team1
  readonly team2
  constructor(
    { team1, team2 },
    readonly team1Won,
    readonly date,
    readonly winningTeamRatingChange,
    readonly losingTeamRatingChange,
    readonly gameId
  ) {
    this.team1 = team1
    this.team2 = team2
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
