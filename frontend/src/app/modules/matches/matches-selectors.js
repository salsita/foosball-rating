import { createSelector } from 'reselect'
import { didPlayerPlayMatch } from './matches-computations'

const fillPlayers = (team, state) => team.map(emptyPlayer => {
  const player = state.players.find(player => player.id === emptyPlayer.id)
  return {
    ...player,
    matchRating: emptyPlayer.matchRating,
  }
})

const getMatches = state => state.matches.map(match => ({
  ...match,
  team1: fillPlayers(match.team1, state),
  team2: fillPlayers(match.team2, state),
}))

export const getLastMatches = createSelector(
  getMatches,
  matches => matches.sort((match1, match2) => match2.date - match1.date),
)

export const getLastMatchesForPlayer = createSelector(
  getLastMatches,
  (state, playerId) => playerId,
  (matches, playerId) => matches.filter(match => didPlayerPlayMatch(playerId, match)),
)
