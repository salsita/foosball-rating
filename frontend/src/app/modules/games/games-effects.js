import { client } from '../api/api-client'

export const getGames = () => client.get('/games')

export const getGameById = id => client.get(`/game/${id}`)
