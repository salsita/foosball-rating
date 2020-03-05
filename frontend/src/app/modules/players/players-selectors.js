import { createSelector } from 'reselect'

import * as Filters from '../../const/leaderboard-filters'
import { didPlayerPlayMatch } from '../matches/matches-selectors'
import {
  computeLongestWinStreak,
  computeWinRatio,
} from '../matches/matches-computations'

export const getPlayers = state => state.players
const getMatches = state => state.matches
const getFilters = state => state.filters

export const getPlayer = createSelector(
  getPlayers,
  (stats, playerId) => playerId,
  (players, playerId) => players.find(player => player.id === playerId),
)

export const getTopRatedPlayers = createSelector(
  getPlayers,
  players => players.sort((player1, player2) => player2.rating - player1.rating),
)

export const getTopPlayers = createSelector(
  getPlayers,
  getMatches,
  getFilters,
  (players, matches, filters) => sortTopPlayers(players, matches, filters),
)

const sortTopPlayers = (players, matches, filters) => {
  const order = filters.order === Filters.orderTypes.ASC ? -1 : 1
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - filters.timespan)
  const matchesLast = matches
    .filter(match => filters.timespan === Filters.timespanTypes.AllTime || match.date > minDate)
    .sort((match1, match2) => match2.date - match1.date)

  const playersWithStatistics  = players.map(player => ({
    ...player,
    criteriaPoints: getPlayerCriteriaPoints(player, matchesLast, filters.criteria),
  }))

  return playersWithStatistics.sort((u1, u2) => (u2.criteriaPoints - u1.criteriaPoints) * order)
}

const getPlayerCriteriaPoints = (player, matchesLast, criteria) => {
  const playerId = Number(player.id)
  const playerMatches = matchesLast.filter(match => didPlayerPlayMatch(playerId, match))
  const winRatio = computeWinRatio(playerId, playerMatches)
  switch (criteria) {
    case Filters.criteriaTypes.Wins:
      return Math.round(playerMatches.length * winRatio)
    case Filters.criteriaTypes.Ratio:
      return (winRatio * 100).toFixed(2)
    case Filters.criteriaTypes.Streak:
      return computeLongestWinStreak(playerId, playerMatches)
    case Filters.criteriaTypes.Matches:
      return playerMatches.length
    default:
      return player.rating
  }
}

export const getRankingsForUser = createSelector(
  getTopUsers,
  (state, userId) => userId,
  (users, userId) => generateRatingStatisticsForUser(users, userId),
)

const generateRatingStatisticsForUser = (users, userId) => {
  const index = users.findIndex(player => player.id === userId)
  return {
    ranking: index + 1,
    toNextRank: index > 0 ? users[index - 1].rating - users[index].rating : 0,
    toPrevRank: index < users.length - 1 ? users[index].rating - users[index + 1].rating : 0,
  }
}
