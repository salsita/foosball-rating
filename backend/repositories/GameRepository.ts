import { GameData } from '../types/Game'
import { InputError } from '../errors/InputError'
import * as storage from '../storage/Storage'

const isValidGameData = (data: unknown): data is GameData => {
  const gameData = data as GameData
  return gameData.name &&
    gameData.description &&
    gameData.name.trim() == gameData.name &&
    gameData.name.toLowerCase() == gameData.name &&
    !gameData.name.includes(' ') &&
    gameData.description.trim() == gameData.description
}

export const addGame = async (data: unknown): Promise<void> => {
  if (!isValidGameData(data)) {
    throw new InputError('Game data is not valid!')
  }
  storage.insertGame(data)
}
