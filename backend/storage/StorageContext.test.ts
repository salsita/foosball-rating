import { StorageContext } from '../storage/StorageContext'
import { FOOSBALL_DATA, FOOSBALL_ROW, FOOSBALL_GAME, FOOSBALL_MATCH_ROW, FOOSBALL_MATCH } from '../tests/TestData'
import { Game } from '../types/Game'
import { insertGame } from './db/db-queries'
import { ConflictError } from '../errors/ConflictError'
import { UNIQUE_VIOLATION_CODE } from './db/db-errors'

const TRANSACTION_MOCK = {
  executeSingleResultQuery: jest.fn(),
  executeQuery: jest.fn(),
}

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
        expect(matches).toEqual([ FOOSBALL_MATCH ])
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
})
