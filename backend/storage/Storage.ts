import * as dbTransactions from './db/db-transactions'
import { StorageContext } from './StorageContext'

export const makeStorageContext = async () => {
  const transaction = await dbTransactions.beginTransaction()
  return new StorageContext(transaction)
}

const executeAndCommit = async operation => {
  const context = await makeStorageContext()
  try {
    const result = await operation(context)
    await context.commit()
    return result
  } catch (error) {
    await context.rollback()
    throw error
  }
}

export const getAllUsers = async () => executeAndCommit(context => context.getAllUsers())

export const getUser = async userId => executeAndCommit(context => context.getUser(userId))

export const updateRatingForUser = async (userId, newRating) =>
  executeAndCommit(context => context.updateRatingForUser(userId, newRating))

export const insertUser = async user => executeAndCommit(context => context.insertUser(user))

export const insertMatch = async match => executeAndCommit(context => context.insertMatch(match))

export const getAllMatches = async () => executeAndCommit(context => context.getAllMatches())

export const getLatestMatch = async () => executeAndCommit(context => context.getLatestMatch())
