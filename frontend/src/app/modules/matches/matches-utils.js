import { withLinks } from '../players/players-utils'

const createMatchWithPlayerLinks = (match, constructUrl) => ({
  ...match,
  team1: withLinks(match.team1, constructUrl),
  team2: withLinks(match.team2, constructUrl),
})

export const withPlayerLinks =
  (matches, constructUrl) => matches.map(match => createMatchWithPlayerLinks(match, constructUrl))
