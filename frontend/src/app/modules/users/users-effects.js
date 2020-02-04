import { client } from '../api/api-client'

export const getUsers = () => client.get('/users')

/**
 * @typedef {Object} User
 * @property {string} name The name of the user to be created.
 * @property {number} initilRating The initial rating of the user to be created.
 *
 * @param {User} user The user to be created
 */
export const addUser = user => client.post('/users', user)
