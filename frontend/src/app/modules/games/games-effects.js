import { client } from '../api/api-client'

export const getGames = () => client.get('/games')
