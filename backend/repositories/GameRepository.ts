import { GameData, isGameData } from '../types/Game'
import { InputError } from '../errors/InputError'
import * as storage from '../storage/Storage'

const isValidGameData = (gameData: GameData): boolean => {
  return gameData.name !== '' &&
    gameData.description !== '' &&
    gameData.name.trim() == gameData.name &&
    gameData.name.toLowerCase() == gameData.name &&
    !gameData.name.includes(' ') &&
    gameData.description.trim() == gameData.description
}

export const addGame = async (data: unknown): Promise<void> => {
  if (!isGameData(data)) {
    throw new InputError('Data is not valid!')
  }
  if (!isValidGameData(data)) {
    throw new InputError('Game data is not valid!')
  }
  storage.insertGame(data)
}
