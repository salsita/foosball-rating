import { GameData } from '../types/Game'
import { InputError } from '../errors/InputError'
import * as storage from '../storage/Storage'

const isValidGame = (gameData: GameData): boolean => {
  if (!gameData.name || !gameData.description) {
    return false
  } else if (gameData.name.trim() != gameData.name) {
    return false
  } else if (gameData.description.trim() != gameData.description) {
    return false
  }
  return true
}

export const addGame = async (gameData: GameData): Promise<void> => {
  if (!isValidGame(gameData)) {
    throw new InputError('Game data is not valid!')
  }
  storage.insertGame(gameData)
}
