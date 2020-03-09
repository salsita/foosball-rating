import * as storage from '../storage/Storage'
import { InputError } from '../errors/InputError'

const isValidName = (name): boolean => {
  if (name.length === 0) {
    return false
  }

  if (name.trim() !== name) {
    return false
  }

  return true
}

export const addUser = async (user): Promise<void> => {
  if (!isValidName(user.name)) {
    throw new InputError('The name is not valid')
  }

  await storage.insertUser(user)
}
