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
  users => [...users].sort((user1, user2) => user2.rating - user1.rating),
)

export const getTopUsers = createSelector(
  getUsers,
  getMatches,
  getFilters,
  (users, matches, filters) => sortTopUsers([...users], [...matches], filters),
)

const sortTopUsers = (users, matches, filters) => {
  const order = filters.order === Filters.orderTypes.ASC ? -1 : 1
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - filters.timespan)
  const matchesLast = matches
    .filter(match => filters.timespan === Filters.timespanTypes.AllTime || match.date > minDate)
    .sort((match1, match2) => match2.date - match1.date)

  users = users.map(user => {
    const userId = Number(user.id)
    const userMatches = matchesLast.filter(match => didUserPlayMatch(userId, match))
    const winRatio = computeWinRatio(userId, userMatches)
    return {
      ...user,
      longestStreak: computeLongestWinStreak(userId, userMatches),
      winRatio,
      totalMatches: userMatches.length,
      totalWins: Number(userMatches.length * winRatio),
    }
  })

  switch (filters.criteria) {
    case Filters.criteriaTypes.Wins:
      return users.sort((user1, user2) => (user2.totalWins - user1.totalWins) * order)
    case Filters.criteriaTypes.Ratio:
      return users.sort((user1, user2) => (user2.winRatio - user1.winRatio) * order)
    case Filters.criteriaTypes.Streak:
      return users.sort((user1, user2) => (user2.longestStreak - user1.longestStreak) * order)
    case Filters.criteriaTypes.Matches:
      return users.sort((user1, user2) => (user2.totalMatches - user1.totalMatches) * order)
    default:
      return users.sort((user1, user2) => (user2.rating - user1.rating) * order)
  }
}
