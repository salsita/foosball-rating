import { client } from '../api/api-client'


/**
 * @typedef {Object} Player
 * @property {number} id The id of the player.
 * @property {string} name The name of the player.
 * @property {number} rating The actual rating of the player.
 * @property {boolean} active Indicator of players's activity.
 * @property {number} initialRating The initial rating of the player.
 */

/**
 * @returns {Array<Player>} The list of players
 */
export const getPlayers = gameName => client.get(`games/${gameName}/players`)

/**
 * @param {Player} player The player to be created
 */
export const addPlayer = (gameName, player) => client.post(`games/${gameName}/players`, player)
