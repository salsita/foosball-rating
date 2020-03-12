import { GameData } from '../types/Game'
import { InputError } from '../errors/InputError'
import * as storage from '../storage/Storage'

const isValidGame = (gameData: GameData): boolean => {
  return gameData.name &&
    gameData.description &&
    gameData.name.trim() == gameData.name &&
    gameData.name.toLowerCase() == gameData.name &&
    !gameData.name.includes(' ') &&
    gameData.description.trim() == gameData.description
}

export const addGame = async (gameData: GameData): Promise<void> => {
  if (!isValidGame(gameData)) {
    throw new InputError('Game data is not valid!')
  }
  storage.insertGame(gameData)
}
