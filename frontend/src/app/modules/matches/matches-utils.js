import { createPlayerWithLink } from '../players/players-utils'

export const createMatchWithPlayerLinks = (match, constructUrl) => {
  const { team1, team2 } = match
  const team1WithLinks = team1.map(player => createPlayerWithLink(player, constructUrl))
  const team2WithLinks = team2.map(player => createPlayerWithLink(player, constructUrl))
  return {
    ...match,
    team1: team1WithLinks,
    team2: team2WithLinks,
  }
}
