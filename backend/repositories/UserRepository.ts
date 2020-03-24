import * as storage from '../storage/Storage'
import { InputError } from '../errors/InputError'
import { isValidUserData } from '../types/User'

export const addUserToGame = async (gameName: string, userData: unknown): Promise<void> => {
  if (!isValidUserData(userData)) {
    throw new InputError('The name is not valid')
  }

  await storage.addUserToGame(gameName, userData)
}
