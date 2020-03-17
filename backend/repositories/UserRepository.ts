import * as storage from '../storage/Storage'
import { InputError } from '../errors/InputError'
import { UserData } from '../types/User'

const isValidName = (name): boolean => {
  if (name.length === 0) {
    return false
  }

  if (name.trim() !== name) {
    return false
  }

  return true
}

export const addUserToGame = async (gameName: string, user: UserData): Promise<void> => {
  if (!isValidName(user.name)) {
    throw new InputError('The name is not valid')
  }

  await storage.addUserToGame(gameName, user)
}
