import * as dbTransactions from './db/db-transactions'
import { StorageContext } from './StorageContext'
import { User, UserData } from '../types/User'
import { MatchWithId } from '../types/Match'
import { Game } from '../types/Game'
import { Player } from '../types/Player'

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

export const getPlayersByGame = async (gameName: string): Promise<Array<Player>> => {
  return executeAndCommit(context => context.getPlayersByGame(gameName))
}

export const getPlayerById = async (id: number): Promise<Player> => {
  return executeAndCommit(context => context.getPlayerById(id))
}

export const addUserToGame = async (gameName: string, user: UserData): Promise<void> => {
  return executeAndCommit(context => context.addUserToGame(gameName, user))
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

export const getGameByName = async (name: string): Promise<Game> => {
  return executeAndCommit(context => context.getGameByName(name))
}

export const insertGame = async (game): Promise<Game> => {
  return executeAndCommit(context => context.insertGame(game))
}

export const getMatchesByGameName = async (name: string): Promise<Array<MatchWithId>> => {
  return executeAndCommit(context => context.getMatchesByGameName(name))
}
