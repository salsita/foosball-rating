import { PlayerInMatches } from './Player';

export class Match {
  constructor(
    readonly team1: PlayerInMatches[],
    readonly team2: PlayerInMatches[],
    readonly team1Won: boolean,
    readonly date: Date,
    readonly winningTeamRatingChange: number,
    readonly losingTeamRatingChange: number,
  ) {
  }
}

export class MatchWithId extends Match {
  constructor(
    readonly id: number,
    readonly team1: PlayerInMatches[],
    readonly team2: PlayerInMatches[],
    readonly team1Won: boolean,
    readonly date: Date,
    readonly winningTeamRatingChange: number,
    readonly losingTeamRatingChange: number,
  ) {
    super(team1, team2, team1Won, date, winningTeamRatingChange, losingTeamRatingChange);
  }
}

export class MatchDescription {
  constructor(
    readonly team1: number[],
    readonly team2: number[],
    readonly team1Won: boolean,
  ) {
  }
}

export class MatchRatingChanges {
  constructor(
    readonly winningTeamRatingChange: number,
    readonly losingTeamRatingChange: number,
  ) {
  }
}

