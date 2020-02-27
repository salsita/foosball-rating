import { createSelector } from 'reselect'

import * as Filters from '../../const/leaderboards-filters'
import { didUserPlayMatch } from '../matches/matches-selectors'
import {
  computeLongestWinStreak,
  computeWinRatio,
} from '../matches/matches-computations'

export const getUsers = state => state.users
const getMatches = state => state.matches
const getFilters = state => state.filters

export const getUser = createSelector(
  getUsers,
  (stats, userId) => userId,
  (users, userId) => users.find(user => user.id === userId),
)

export const getTopRatedUsers = createSelector(
  getUsers,
  users => users.sort((user1, user2) => user2.rating - user1.rating),
)

export const getTopUsers = createSelector(
  getUsers,
  getMatches,
  getFilters,
  (users, matches, filters) => sortTopUsers(users, matches, filters),
)

const sortTopUsers = (users, matches, filters) => {
  const order = filters.order === Filters.orderTypes.ASC ? -1 : 1
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - filters.timespan)
  const matchesLast = matches
    .filter(match => filters.timespan === Filters.timespanTypes.AllTime || match.date > minDate)
    .sort((match1, match2) => match2.date - match1.date)

  const usersWithStatistics  = users.map(user => getUserStatistics(user, matchesLast))
  switch (filters.criteria) {
    case Filters.criteriaTypes.Wins:
      return usersWithStatistics.sort((u1, u2) => (u2.stats.wins - u1.stats.wins) * order)
    case Filters.criteriaTypes.Ratio:
      return usersWithStatistics.sort((u1, u2) => (u2.stats.winRatio - u1.stats.winRatio) * order)
    case Filters.criteriaTypes.Streak:
      return usersWithStatistics.sort((u1, u2) => (u2.stats.streak - u1.stats.streak) * order)
    case Filters.criteriaTypes.Matches:
      return usersWithStatistics.sort((u1, u2) => (u2.stats.matches - u1.stats.matches) * order)
    default:
      return usersWithStatistics.sort((u1, u2) => (u2.rating - u1.rating) * order)
  }
}

const getUserStatistics = (user, matchesLast) => {
  const userId = Number(user.id)
    const userMatches = matchesLast.filter(match => didUserPlayMatch(userId, match))
    const winRatio = computeWinRatio(userId, userMatches)
    return {
      ...user,
      stats: {
        streak: computeLongestWinStreak(userId, userMatches),
        winRatio,
        matches: userMatches.length,
        wins: Math.round(userMatches.length * winRatio),
      }
    }
}
