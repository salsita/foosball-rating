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

const generateStatisticsForPlayer = (playerId, playerMatches) => {
  const matchChanges = generateMatchRatingChanges(playerId, playerMatches)
  const days = computeDays(matchChanges)
  const teammates = computeTeammates(playerId, playerMatches)
  const opponents = computeOpponents(playerId, playerMatches)

  return {
    matchChanges,
    longestStreak: computeLongestWinStreak(playerId, playerMatches),
    winRatio: computeWinRatio(playerId, playerMatches),
    totalMatches: playerMatches.length,
    wins: computeWins(playerId, playerMatches),
    bestDay: findMax(days),
    worstDay: findMin(days),

    mostFrequentTeammate: findMax(teammates, 'matches'),
    leastFrequentTeammate: findMin(teammates, 'matches'),
    mostSuccessTeammate: findMax(teammates, 'wins'),
    leastSuccessTeammate: findMax(teammates, 'losses'),

    mostFrequentOpponent: findMax(opponents, 'matches'),
    leastFrequentOpponent: findMin(opponents, 'matches'),
    mostSuccessOpponent: findMax(opponents, 'wins'),
    leastSuccessOpponent: findMax(opponents, 'losses'),
  }
}

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
