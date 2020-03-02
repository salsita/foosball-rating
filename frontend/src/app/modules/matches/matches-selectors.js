import { createSelector } from 'reselect'
import {
  computeLongestWinStreak,
  computeWinRatio,
  generateMatchRatingChanges,
  plotRatingHistory,
  computeDays,
  computeTeammates,
  computeOpponents,
} from './matches-computations'
import { getPlayer } from '../players/players-selectors'

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

export const didPlayerPlayMatch = (playerId, match) => {
  const allPlayers = [...match.team1, ...match.team2]
  return !!allPlayers.find(player => player.id === playerId)
}

export const getLastMatches = createSelector(
  getMatches,
  matches => matches.sort((match1, match2) => match2.date - match1.date),
)

const getLastMatchesForPlayer = createSelector(
  getLastMatches,
  (state, playerId) => playerId,
  (matches, playerId) => matches.filter(match => didPlayerPlayMatch(playerId, match)),
)

const generateStatisticsForPlayer = (playerId, playerMatches) => ({
  matchChanges: generateMatchRatingChanges(playerId, playerMatches),
  longestStreak: computeLongestWinStreak(playerId, playerMatches),
  winRatio: computeWinRatio(playerId, playerMatches),
  totalMatches: playerMatches.length,
  moreStatistics: computeMoreStatistics(playerId, matchChanges, playerMatches),
})

const computeMoreStatistics = (playerId, matchChanges, playerMatches) => ({
  ...computeDays(matchChanges), 
  ...computeTeammates(playerId, playerMatches),
  ...computeOpponents(playerId, playerMatches),
})

export const getStatisticsForPlayer = createSelector(
  getLastMatchesForPlayer,
  (state, playerId) => playerId,
  (playerMatches, playerId) => generateStatisticsForPlayer(playerId, playerMatches),
)

export const getRatingHistoryGraphForPlayer = createSelector(
  getLastMatchesForPlayer,
  getPlayer,
  (playerMatches, player) => plotRatingHistory(playerMatches, player.id, player.initialRating),
)
