import * as dbTransformations from './db/db-transformations'
import * as dbQueries from './db/db-queries'
import * as dbErrors from './db/db-errors'
import { Transaction } from './db/db-transactions'
import { ConflictError } from '../errors/ConflictError'
import { NotFoundError } from '../errors/NotFoundError'
import { User, UserData } from '../types/User'
import { MatchWithId, Match } from '../types/Match'
import { Game, GameData } from '../types/Game'
import { Player, NULL_PLAYER, PlayerData } from '../types/Player'
import { BadRequestError } from '../errors/BadRequestError'
import { QueryResultRow } from 'pg'

export class StorageContext {
  constructor(private transaction: Transaction) {}

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

  async getPlayersByGame(gameName: string): Promise<Array<Player>> {
    const game = await this.getGameByName(gameName)
    if (!game) {
      throw new Error(`Game type with name '${gameName}' doesn't exist`)
    }
    return await this.getPlayersByGameId(game.id)
  }

  async getPlayersByGameId(gameId: number): Promise<Array<Player>> {
    let rows
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectPlayersByGameIdJoinUsers, [gameId])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to get players by game id')
    }
    return rows.map(dbTransformations.createPlayerFromDbRow)
  }

  async getPlayerById(id: number): Promise<Player> {
    const query = dbQueries.selectPlayerByIdJoinUser
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, [id])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to fetch player')
    }

    if (!row) {
      throw new NotFoundError(`Player id '${id}' doesn't exist`)
    }

    return dbTransformations.createPlayerFromDbRow(row)
  }

  async getUser(userId: number): Promise<User> {
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

  async getUserByName(userName: string): Promise<User> {
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.selectUserByName, [userName])
    } catch (error) {
      console.error(error)
      throw new Error(`User with name ${userName} doesn't exist`)
    }
    return row && dbTransformations.createUserFromDbRow(row)
  }

  async updateRatingForPlayer(playerId: number, newRating: number): Promise<void> {
    const query = dbQueries.updateRatingForPlayer
    const values = [newRating, playerId]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      throw new Error('Unable to update rating for player')
    }

    if (!row) {
      throw new NotFoundError(`Player id '${playerId}' doesn't exist`)
    }
  }

  async insertPlayer({ initialRating, userId, gameId }: PlayerData): Promise<void> {
    try {
      await this.transaction.executeSingleResultQuery(dbQueries.insertPlayer, [
        userId, initialRating, initialRating, gameId,
      ])
    } catch (error) {
      console.error(error)
      if (dbErrors.isUniqueViolation(error)) {
        throw new ConflictError('A player with same user and game ids already exists')
      }
      throw new Error('Unable to insert player')
    }
  }

  async addUserToGame(gameName: string, { name, initialRating }: UserData): Promise<void> {
    const game = await this.getGameByName(gameName)
    if (!game) {
      throw new Error(`Unable to find game '${game.name}'`)
    }
    let user = await this.getUserByName(name)
    if (!user) {
      user = await this.insertUser(name)
    }
    await this.insertPlayer(new PlayerData(initialRating, user.id, game.id))
  }

  async insertUser(name: string): Promise<User> {
    const query = dbQueries.insertUser
    const values = [name, true]

    let row
    try {
      row = await this.transaction.executeSingleResultQuery(query, values)
    } catch (error) {
      console.error(error)
      if (dbErrors.isUniqueViolation(error)) {
        throw new ConflictError(`User ${name} already exists`)
      }
      throw new Error('Unable to add user')
    }

    return dbTransformations.createUserFromDbRow(row)
  }

  async updateRatingForTeam(team: Array<Player>, difference: number): Promise<void> {
    await Promise.all(team.map(player => {
      const newRating = player.rating + difference
      return this.updateRatingForPlayer(player.id, newRating)
    }))
  }

  async storeMatch(match: Match): Promise<MatchWithId> {
    const winningTeam = match.team1Won ? match.team1 : match.team2
    const losingTeam = match.team1Won ? match.team2 : match.team1
    const result = await this.insertMatch(match)

    await this.updateRatingForTeam(winningTeam, match.winningTeamRatingChange)
    await this.updateRatingForTeam(losingTeam, match.losingTeamRatingChange)
    return result
  }

  async insertMatch(match: Match): Promise<MatchWithId> {
    const team1Player1 = match.team1[0]
    const team1Player2 = match.team1[1] || NULL_PLAYER
    const team2Player1 = match.team2[0]
    const team2Player2 = match.team2[1] || NULL_PLAYER

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
      if (dbErrors.isRaiseException(error)) {
        throw new BadRequestError(error.message)
      } else if (dbErrors.isCheckViolation(error)) {
        throw new BadRequestError('Duplicate players are not allowed in a match')
      }
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

  async getLatestMatchByGameId(gameId: number): Promise<MatchWithId> {
    let row
    try {
      row = await this.transaction.executeSingleResultQuery(
        dbQueries.selectLatestMatchByGameId, [gameId])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve latest match')
    }
    return row && dbTransformations.createMatchFromDbRow(row)
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
    return row && dbTransformations.createGameFromDbRow(row)
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
    let row: QueryResultRow
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.selectGameByName, [name])
    } catch (error) {
      console.error(error)
      throw new Error('Unable to retrieve game by name')
    }
    if (!row) {
      throw new Error(`Game with name '${name}' doesn't exist`)
    }
    return dbTransformations.createGameFromDbRow(row)
  }

  async getMatchesByGameName(gameName: string): Promise<Array<MatchWithId>> {
    const game = await this.getGameByName(gameName)
    return await this.getMatchesByGameId(game.id)
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
