import { client } from "../api/api-client"

export const getMatches = () => client.get('/matches')

/**
 * @typedef {Object} Match
 * @property {Array<number>} team1 Array of 1 or 2 elements containing IDs of players from team1.
 * @property {Array<number>} team1 Array of 1 or 2 elements containing IDs of players from team1.
 * @property {boolean} team1Won True if team1 won, false if team2 won.
 * 
 * @param {Match} match Match to be added. 
 */
export const addMatch = (match) => client.post("/matches", match)
