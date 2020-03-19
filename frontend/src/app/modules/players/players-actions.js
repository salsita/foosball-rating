import { createActions } from 'reduxsauce'

export const UsersActions = createActions({
  updateStatus: ['status'],
  addUser: ['user'],
  usersLoaded: ['users'],
}, {
  prefix: 'foosball-rating/players/',
})
