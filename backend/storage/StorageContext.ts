import * as dbTransformations from './db/db-transformations'
import * as dbQueries from './db/db-queries'
import * as dbErrors from './db/db-errors'
import { ConflictError } from '../errors/ConflictError'
import { InputError } from '../errors/InputError'
import { NotFoundError } from '../errors/NotFoundError'
import { User } from '../types/User'
import { MatchWithId, Match } from '../types/Match'
import { Game, GameData } from '../types/Game'

export class StorageContext {
  constructor(private transaction) {}

  async getAllUsers(): Promise<Array<User>> {
    let rows
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectAllusers, [])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve users')
    }

    return rows.map(dbTransformations.createUserFromDbRow)
  }

  async getUser(userId): Promise<User> {
    const query = dbQueries.selectUser
    const values = [userId]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      throw new Error('Unable to fetch user')
    }

    if (!row) {
      throw new NotFoundError(`User ${userId} doesn't exist`)
    }

    return dbTransformations.createUserFromDbRow(row)
  }

  async updateRatingForUser(userId, newRating): Promise<User> {
    const query = dbQueries.updateRatingForUser
    const values = [newRating, userId]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      throw new Error('Unable to update rating for user')
    }

    if (!row) {
      throw new NotFoundError(`User ${userId} doesn't exist`)
    }

    return dbTransformations.createUserFromDbRow(row)
  }

  async insertUser(user): Promise<User> {
    const query = dbQueries.insertUser
    const values = [user.name, user.initialRating, true, user.initialRating]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      if (dbErrors.isUniqueViolation(error)) {
        throw new ConflictError(`User ${user.name} already exists`)
      }
      throw new Error('Unable to add user')
    }

    return dbTransformations.createUserFromDbRow(row)
  }

  async insertMatch(match: Match): Promise<MatchWithId> {
    const isTeamSizeSupported = (team): boolean => team.length >= 1 && team.length <= 2
    if (!isTeamSizeSupported(match.team1) || !isTeamSizeSupported(match.team2)) {
      throw new InputError('Inserting teams with unsupported number of players')
    }

    const team1Player1 = match.team1[0]
    const team1Player2 = match.team1[1] || { }
    const team2Player1 = match.team2[0]
    const team2Player2 = match.team2[1] || { }

    const query = dbQueries.insertMatch
    const values = [team1Player1.id, team1Player1.rating, team1Player2.id, team1Player2.rating,
      team2Player1.id, team2Player1.rating, team2Player2.id, team2Player2.rating,
      match.date, match.winningTeamRatingChange, match.losingTeamRatingChange, match.team1Won,
      match.gameId]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      throw new Error('Unable to create match')
    }

    return dbTransformations.createMatchFromDbRow(row)
  }

  async getAllMatches(): Promise<Array<MatchWithId>> {
    let rows
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectAllMatches, [])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve matches')
    }

    return rows.map(dbTransformations.createMatchFromDbRow)
  }

  async getLatestMatch(): Promise<MatchWithId> {
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.selectLatestMatch, [])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve latest match')
    }

    return row != null ? dbTransformations.createMatchFromDbRow(row) : null
  }

  async getAllGames(): Promise<Array<Game>> {
    let rows
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectAllGames, [])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve games')
    }
    return rows.map(dbTransformations.createGameFromDbRow)
  }

  async insertGame(game: GameData): Promise<Game> {
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.insertGame, [
        game.name,
        game.description,
      ])
    } catch (error) {
      console.error(error)
      if (dbErrors.isUniqueViolation(error)) {
        throw new ConflictError('Game already exists')
      }
      throw new Error('Unable to insert new game')
    }
    return row !== null ? dbTransformations.createGameFromDbRow(row): null
  }

  async getMatchesByGameId(id: number): Promise<Array<MatchWithId>> {
    let rows
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectMatchesByGameId, [id])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve matches')
    }

    return rows.map(dbTransformations.createMatchFromDbRow)
  }

  async getGameByName(name: string): Promise<Game> {
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.selectGameByName, [name])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve game by name')
    }
    return row ? dbTransformations.createGameFromDbRow(row) : null
  }

  async getMatchesByGameName(gameName: string): Promise<Array<MatchWithId>> {
    const game: Game = await this.getGameByName(gameName)
    if (!game) {
      throw new Error(`Game type with name '${gameName}' doesn't exist`)
    }
    const matches: Array<MatchWithId> = await this.getMatchesByGameId(game.id)
    return matches
  }

  async commit(): Promise<void> {
    try {
      await this.transaction.commit()
    } catch (error) {
      console.error(error)
      throw new Error('Unable to commit transaction')
    }
  }

  async rollback(): Promise<void> {
    await this.transaction.rollback()
  }
}
