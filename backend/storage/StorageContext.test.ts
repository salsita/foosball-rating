import { StorageContext } from '../storage/StorageContext'
import {
  FOOSBALL_DATA,
  FOOSBALL_ROW,
  FOOSBALL_GAME,
  FOOSBALL_MATCH_ROW,
  FOOSBALL_MATCH_WITH_ID,
  TONDA_PLAYER,
  TONDA_PLAYER_ROW,
  PETR_PLAYER,
  PETR_PLAYER_ROW,
  RADEK_PLAYER,
  RADEK_PLAYER_ROW,
  TONDA_USER_ROW,
  TONDA_USER,
  FOOSBALL_MATCH,
} from '../tests/TestData'
import { Game } from '../types/Game'
import { insertGame } from './db/db-queries'
import { ConflictError } from '../errors/ConflictError'
import { UNIQUE_VIOLATION_CODE } from './db/db-errors'
import * as dbQueries from './db/db-queries'
import { MatchWithId } from '../types/Match'
import { Transaction } from './db/db-transactions'
jest.mock('./db/db-transactions')

const MockedTransaction = Transaction as jest.Mock<Transaction>
const TRANSACTION_MOCK = new MockedTransaction() as jest.Mocked<Transaction>

describe('StorageContext', () => {
  let context: StorageContext
  beforeEach(() => {
    jest.clearAllMocks()
    context = new StorageContext(TRANSACTION_MOCK)
  })
  describe('insertGame', () => {
    it('executes insertGame query with Foosball data', () => {
      TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_ROW)
      context.insertGame(FOOSBALL_DATA)
      expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(insertGame, [
        FOOSBALL_DATA.name,
        FOOSBALL_DATA.description,
      ])
    })
    describe.each([
      [ 'null', 'null', null, null ],
      [ 'foosball row', 'foosball game', FOOSBALL_ROW, FOOSBALL_GAME ],
    ])('when executeSingleResultQuery resolves with %s', (res1Desc, res2Desc, row, result) => {
      let foosballGame: Game
      beforeEach(async () => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(row)
        foosballGame = await context.insertGame(FOOSBALL_DATA)
      })
      it(`resolves with ${res2Desc}`, () => {
        expect(foosballGame).toEqual(result)
      })
    })
    describe.each([
      [ UNIQUE_VIOLATION_CODE, ConflictError ],
      [ 'some other code', Error ],
    ])('when executeSingleResultQuery throws with code "%s"', (code, errorType) => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockRejectedValueOnce({ code })
      })
      it(`rejects with ${errorType.name}`, async () => {
        await expect(context.insertGame(FOOSBALL_DATA)).rejects.toThrowError(errorType)
      })
    })
  })

  describe('getAllGames', () => {
    describe.each([
      ['empty array', 'empty array', [], []],
      ['foosball rows', 'foosball games', [FOOSBALL_ROW], [FOOSBALL_GAME]],
    ])('when executeQuery resolves with %s', (result1Desc, result2Desc, rows, result) => {
      let games: Array<Game>
      beforeEach(async () => {
        TRANSACTION_MOCK.executeQuery.mockResolvedValueOnce(rows)
        games = await context.getAllGames()
      })
      it(`resolves with ${result2Desc}`, async () => {
        expect(games).toEqual(result)
      })
    })
  })

  describe('getGameByName', () => {
    describe('when single result query resolves with data', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_ROW)
      })
      it('resolves with the game', async () => {
        const game = await context.getGameByName(FOOSBALL_GAME.name)
        expect(game).toEqual(FOOSBALL_GAME)
      })
    })
    describe('when single result query throws', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockRejectedValueOnce(null)
      })
      it('rejects with Error', async () => {
        await expect(context.getGameByName(FOOSBALL_GAME.name)).rejects.toThrowError(Error)
      })
    })
    describe('when foosball does not exist', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
      })
      it('rejects with Error', async () => {
        await expect(context.getGameByName(FOOSBALL_GAME.name)).rejects.toThrowError(Error)
      })
    })
  })

  describe('getMatchesByGameName', () => {
    describe('when queries resolve with data', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_ROW)
        TRANSACTION_MOCK.executeQuery.mockResolvedValue([ FOOSBALL_MATCH_ROW ])
      })
      it('resolves with the matches', async () => {
        const matches = await context.getMatchesByGameName(FOOSBALL_GAME.name)
        expect(matches).toEqual([ FOOSBALL_MATCH_WITH_ID ])
      })
    })
    describe('when there is no such game', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
      })
      it('rejects with Error', async () => {
        await expect(context.getMatchesByGameName(FOOSBALL_GAME.name)).rejects.toThrowError(Error)
      })
    })
  })

  describe('getPlayersByGame', () => {
    describe('when no game found', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
      })
      it('rejects with Error', async () => {
        await expect(context.getPlayersByGame(FOOSBALL_GAME.name)).rejects.toThrowError(Error)
      })
    })
    describe('when Tonda plays foosball', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_ROW)
        TRANSACTION_MOCK.executeQuery.mockResolvedValueOnce([TONDA_PLAYER_ROW])
      })
      it('resolves with Tonda', async () => {
        const players = await context.getPlayersByGame(FOOSBALL_GAME.name)
        expect(players).toEqual([TONDA_PLAYER])
      })
    })
  })

  describe('getPlayerById', () => {
    describe('when player Tonda does not exist', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
      })
      it('rejects with Error', async () => {
        await expect(context.getPlayerById(TONDA_PLAYER.id)).rejects.toThrowError(Error)
      })
    })
    describe('when player Tonda exists', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(TONDA_PLAYER_ROW)
      })
      it('resolves with Tonda', async () => {
        const player = await context.getPlayerById(TONDA_PLAYER.id)
        expect(player).toEqual(TONDA_PLAYER)
      })
    })
  })

  describe('addUserToGame', () => {
    describe('when foosball game exists', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_ROW)
      })
      describe('when a new user Tonda is successfully added to foosball game', () => {
        beforeEach(async () => {
          TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
          TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(TONDA_USER_ROW)
          TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(undefined)
          await context.addUserToGame(FOOSBALL_GAME.name, TONDA_PLAYER)
        })
        it('searches game by name', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(
            dbQueries.selectGameByName, [FOOSBALL_GAME.name]
          )
        })
        it('searches Tonda as a user', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(
            dbQueries.selectUserByName, [TONDA_USER.name]
          )
        })
        it('inserts Tonda as a user', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(
            dbQueries.insertUser, [TONDA_PLAYER.name, TONDA_PLAYER.active]
          )
        })
        it('inserts Tonda as a player', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(
            dbQueries.insertPlayer, [
              TONDA_USER.id,
              TONDA_PLAYER.initialRating,
              TONDA_PLAYER.initialRating,
              FOOSBALL_GAME.id,
            ]
          )
        })
      })
      describe('when an existing player Tonda is successfully added to foosball game', () => {
        beforeEach(async () => {
          TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(TONDA_USER_ROW)
          TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(undefined)
          await context.addUserToGame(FOOSBALL_GAME.name, TONDA_PLAYER)
        })
        it('does not insert Tonda as a user', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).not.toBeCalledWith(
            dbQueries.insertUser, expect.anything()
          )
        })
        it('inserts Tonda as a player', () => {
          expect(TRANSACTION_MOCK.executeSingleResultQuery).toBeCalledWith(
            dbQueries.insertPlayer, [
              TONDA_USER.id,
              TONDA_PLAYER.initialRating,
              TONDA_PLAYER.initialRating,
              FOOSBALL_GAME.id,
            ]
          )
        })
      })
    })
    describe('when foosball game does not exist', () => {
      beforeEach(() => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(null)
      })
      it('throws an error', async () => {
        await expect(context.addUserToGame(FOOSBALL_GAME.name, TONDA_PLAYER))
          .rejects.toThrowError(Error)
      })
    })
  })

  describe('storeMatch', () => {
    describe('when all db queries are successful', () => {
      let matchWithId: MatchWithId
      beforeEach(async () => {
        // insert match query
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_MATCH_ROW)
        // update ratings queries
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(TONDA_PLAYER_ROW)
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(RADEK_PLAYER_ROW)
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(PETR_PLAYER_ROW)

        matchWithId = await context.storeMatch(FOOSBALL_MATCH)
      })
      it('inserts the match', () => {
        expect(TRANSACTION_MOCK.executeSingleResultQuery)
          .toBeCalledWith(dbQueries.insertMatch, [
            TONDA_PLAYER.id, TONDA_PLAYER.rating,
            null, null,
            RADEK_PLAYER.id, RADEK_PLAYER.rating,
            PETR_PLAYER.id, PETR_PLAYER.rating,
            FOOSBALL_MATCH.date,
            FOOSBALL_MATCH.winningTeamRatingChange,
            FOOSBALL_MATCH.losingTeamRatingChange,
            FOOSBALL_MATCH.team1Won,
            FOOSBALL_MATCH.gameId,
          ])
      })
      it('returns match with id', () => {
        expect(matchWithId).toEqual(FOOSBALL_MATCH_WITH_ID)
      })
      it('increases rating for Tonda', () => {
        expect(TRANSACTION_MOCK.executeSingleResultQuery)
          .toBeCalledWith(dbQueries.updateRatingForPlayer, [
            TONDA_PLAYER.rating + FOOSBALL_MATCH.winningTeamRatingChange,
            TONDA_PLAYER.id,
          ])
      })
      it('decreases rating for Radek and Petr', () => {
        expect(TRANSACTION_MOCK.executeSingleResultQuery)
          .toBeCalledWith(dbQueries.updateRatingForPlayer, [
            RADEK_PLAYER.rating + FOOSBALL_MATCH.losingTeamRatingChange,
            RADEK_PLAYER.id,
          ])
        expect(TRANSACTION_MOCK.executeSingleResultQuery)
          .toBeCalledWith(dbQueries.updateRatingForPlayer, [
            PETR_PLAYER.rating + FOOSBALL_MATCH.losingTeamRatingChange,
            PETR_PLAYER.id,
          ])
      })
    })
  })
  describe('getLatestMatchByGameId', () => {
    describe('called with foosball id', () => {
      let matchWithId: MatchWithId
      beforeEach(async () => {
        TRANSACTION_MOCK.executeSingleResultQuery.mockResolvedValueOnce(FOOSBALL_MATCH_ROW)
        matchWithId = await context.getLatestMatchByGameId(FOOSBALL_GAME.id)
      })
      it('returns the match with id', () => {
        expect(matchWithId).toEqual(FOOSBALL_MATCH_WITH_ID)
      })
      it('selects latest match by game id', () => {
        expect(TRANSACTION_MOCK.executeSingleResultQuery)
          .toBeCalledWith(dbQueries.selectLatestMatchByGameId, [
            FOOSBALL_GAME.id,
          ])
      })
    })
  })
})
