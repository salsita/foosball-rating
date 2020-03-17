export interface MatchDescription {
  readonly team1: Array<number>;
  readonly team2: Array<number>;
  readonly team1Won: boolean;
}

const isArrayOfTeamIds = (teamIds: unknown): teamIds is Array<number> => {
  return teamIds instanceof Array &&
    (1 <= teamIds.length && teamIds.length <= 2) &&
    teamIds.every(playerId => typeof playerId === 'number')
}

export const isMatchDescription = (matchData: unknown): matchData is MatchDescription => {
  const matchDescription = matchData as MatchDescription
  return isArrayOfTeamIds(matchDescription.team1) &&
    isArrayOfTeamIds(matchDescription.team2) &&
    typeof matchDescription.team1Won === 'boolean'
}
