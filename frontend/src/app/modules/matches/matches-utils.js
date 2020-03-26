import { createPlayerWithLink } from '../players/players-utils'

export const createMatchWithPlayerLinks = (match, constructUrl) => ({
  ...match,
  team1: match.team1.map(player => createPlayerWithLink(player, constructUrl)),
  team2: match.team2.map(player => createPlayerWithLink(player, constructUrl)),
})
