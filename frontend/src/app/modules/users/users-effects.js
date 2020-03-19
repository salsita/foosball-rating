import { client } from '../api/api-client'


/**
 * @typedef {Object} User
 * @property {number} id The id of the user.
 * @property {string} name The name of the user.
 * @property {number} rating The actual rating of the user.
 * @property {boolean} active Indicator of users's activity.
 * @property {number} initialRating The initial rating of the user.
 */

/**
 * @returns {Array<User>} The list of users
 */
export const getUsers = gameName => client.get(`games/${gameName}/players`)

/**
 * @param {User} user The user to be created
 */
export const addUser = (gameName, user) => client.post(`games/${gameName}/players`, user)
