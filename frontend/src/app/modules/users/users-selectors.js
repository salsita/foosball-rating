import { createSelector } from 'reselect'

import * as Filters from '../../const/leaderboard-filters'
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

  const usersWithStatistics  = users.map(user => ({
    ...user,
    criteriaPoints: getUserCriteriaPoints(user, matchesLast, filters.criteria),
  }))

  return usersWithStatistics.sort((u1, u2) => (u2.criteriaPoints - u1.criteriaPoints) * order)
}

const getUserCriteriaPoints = (user, matchesLast, criteria) => {
  const userId = Number(user.id)
  const userMatches = matchesLast.filter(match => didUserPlayMatch(userId, match))
  const winRatio = computeWinRatio(userId, userMatches)
  switch (criteria) {
    case Filters.criteriaTypes.Wins:
      return Math.round(userMatches.length * winRatio)
    case Filters.criteriaTypes.Ratio:
      return (winRatio * 100).toFixed(2)
    case Filters.criteriaTypes.Streak:
      return computeLongestWinStreak(userId, userMatches)
    case Filters.criteriaTypes.Matches:
      return userMatches.length
    default:
      return user.rating
  }
}
