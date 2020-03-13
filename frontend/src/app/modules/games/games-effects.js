import { client } from '../api/api-client'

export const getGames = () => client.get('/games')

export const getMatchesByGameName = name => client.get(`/games/${name}/matches`)
