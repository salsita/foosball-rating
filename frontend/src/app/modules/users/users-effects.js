import { client } from '../api/api-client'


/**
 * @typedef {Object} User
 * @property {number} id The id of the user.
 * @property {string} name The name of the user.
 * @property {number} rating The actual rating of the user.
 * @property {boolean} active Indicator of users's activity.
 * @property {number} initilRating The initial rating of the user.
 *
 * @returns {Array<User>} The list of users
 */
export const getUsers = () => client.get('/users')

/**
 * @typedef {Object} User
 * @property {string} name The name of the user to be created.
 * @property {number} initilRating The initial rating of the user to be created.
 *
 * @param {User} user The user to be created
 */
export const addUser = user => client.post('/users', user)
