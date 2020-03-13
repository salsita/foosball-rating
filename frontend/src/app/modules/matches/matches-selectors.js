import { createSelector } from 'reselect'
import {
  computeLongestWinStreak,
  computeWinRatio,
  computeWins,
  generateMatchRatingChanges,
  plotRatingHistory,
  findMax,
  findMin,
  computeDays,
  computeTeammateStats,
  computeOpponentsStats,
  computeKingStreakDuration,
} from './matches-computations'
import { getPlayer, getTopRatedPlayers } from '../players/players-selectors'

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

const generateStatisticsForPlayer = (playerId, playerMatches) => {
  const matchChanges = generateMatchRatingChanges(playerId, playerMatches)
  const days = computeDays(matchChanges)
  const teammateStats = computeTeammateStats(playerId, playerMatches)
  const opponentStats = computeOpponentsStats(playerId, playerMatches)

  return {
    matchChanges,
    longestStreak: computeLongestWinStreak(playerId, playerMatches),
    winRatio: computeWinRatio(playerId, playerMatches),
    totalMatches: playerMatches.length,
    wins: computeWins(playerId, playerMatches),
    bestDay: findMax(days),
    worstDay: findMin(days),

    mostFrequentTeammate: findMax(teammateStats, teammate => teammate.matches),
    leastFrequentTeammate: findMin(teammateStats, teammate => teammate.matches),
    mostSuccessTeammate: findMax(teammateStats, teammate => teammate.wins),
    leastSuccessTeammate: findMax(teammateStats, teammate => teammate.losses),

    mostFrequentOpponent: findMax(opponentStats, opponent => opponent.matches),
    leastFrequentOpponent: findMin(opponentStats, opponent => opponent.matches),
    mostSuccessOpponent: findMax(opponentStats, opponent => opponent.wins),
    leastSuccessOpponent: findMax(opponentStats, opponent => opponent.losses),
  }
}

export const getKing = createSelector(
  getLastMatches,
  getTopRatedPlayers,
  (userMatches, users) => computeKingStreakDuration(userMatches, users)
)

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
