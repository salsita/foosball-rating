import { createSelector } from 'reselect'

export const getUsers = state => state.users

export const getUser = createSelector(
  getUsers,
  (stats, userId) => userId,
  (users, userId) => users.find(user => user.id === userId),
)

export const getTopUsers = createSelector(
  getUsers,
  users => [...users].sort((user1, user2) => user2.rating - user1.rating),
)
