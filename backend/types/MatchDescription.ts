export interface MatchDescription {
  readonly team1: Array<number>;
  readonly team2: Array<number>;
  readonly team1Score: number;
  readonly team2Score: number;
}

const isArrayOfTeamIds = (teamIds: unknown): teamIds is Array<number> => {
  return teamIds instanceof Array &&
    (1 <= teamIds.length && teamIds.length <= 2) &&
    teamIds.every(playerId => typeof playerId === 'number')
}

const isNonNegativeInteger = (num: unknown): num is number => {
  return typeof num === 'number' &&
    Number.isInteger(num) &&
    num >= 0
}

export const isMatchDescription = (matchData: unknown): matchData is MatchDescription => {
  const matchDescription = matchData as MatchDescription
  return isArrayOfTeamIds(matchDescription.team1) &&
    isArrayOfTeamIds(matchDescription.team2) &&
    isNonNegativeInteger(matchDescription.team1Score) &&
    isNonNegativeInteger(matchDescription.team2Score)
}
