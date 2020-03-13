import * as dbTransactions from './db/db-transactions'
import { StorageContext } from './StorageContext'
import { User } from '../types/User'
import { MatchWithId } from '../types/Match'
import { Game, FullGame } from '../types/Game'

export const makeStorageContext = async (): Promise<StorageContext> => {
  const transaction = await dbTransactions.beginTransaction()
  return new StorageContext(transaction)
}

interface Operation<T> {
  (context: StorageContext): Promise<T>;
}
const executeAndCommit = async <TResult>(operation: Operation<TResult>): Promise<TResult> => {
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

export const getAllUsers = async (): Promise<Array<User>> => {
  return executeAndCommit(context => context.getAllUsers())
}

export const getUser = async (userId): Promise<User> => {
  return executeAndCommit(context => context.getUser(userId))
}

export const updateRatingForUser = async (userId, newRating): Promise<User> => {
  return executeAndCommit(context => context.updateRatingForUser(userId, newRating))
}

export const insertUser = async (user): Promise<User> => {
  return executeAndCommit(context => context.insertUser(user))
}

export const getAllMatches = async (): Promise<Array<MatchWithId>> => {
  return executeAndCommit(context => context.getAllMatches())
}

export const getLatestMatch = async (): Promise<MatchWithId> => {
  return executeAndCommit(context => context.getLatestMatch())
}

export const getAllGames = async (): Promise<Array<Game>> => {
  return executeAndCommit(context => context.getAllGames())
}

export const insertGame = async (game): Promise<Game> => {
  return executeAndCommit(context => context.insertGame(game))
}

export const getGameById = async (id: number): Promise<FullGame> => {
  return executeAndCommit(context => context.getFullGameById(id))
}
