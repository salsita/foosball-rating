import { recordMatch } from './MatchRepository'
import {
  FOOSBALL_GAME,
  FOOSBALL_MATCH_DESCRIPTION,
  FOOSBALL_MATCH,
  TONDA_PLAYER,
  FOOSBALL_MATCH_WITH_ID,
  HALF_MINUTE_AFTER,
  ONE_MINUTE_AFTER,
  RADEK_PLAYER,
  PETR_PLAYER,
  ERROR,
} from '../tests/TestData'
import { getGameByName, getPlayerById, getLatestMatchByGameId, storeMatch } from '../storage/Storage'
import { mocked } from 'ts-jest/utils'
import { computeRatingChanges } from '../rating/rating-calculator'
import { lockDate } from '../tests/mocks'
import { InputError } from '../errors/InputError'
jest.mock('../storage/Storage')
jest.mock('../rating/rating-calculator')

const mockedGetGameByName = mocked(getGameByName, false)
const mockedGetPlayerById = mocked(getPlayerById, false)
const mockedGetLatestMatchByGameId = mocked(getLatestMatchByGameId, false)
const mockedStoreMatch = mocked(storeMatch, false)
const mockedComputeRatingChanges = mocked(computeRatingChanges, false)

describe('MatchRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('recordMatch', () => {
    describe('when storage calls resolve with data', () => {
      beforeEach(() => {
        mockedComputeRatingChanges.mockReturnValueOnce({
          winningTeamRatingChange: FOOSBALL_MATCH_WITH_ID.winningTeamRatingChange,
          losingTeamRatingChange: FOOSBALL_MATCH_WITH_ID.losingTeamRatingChange,
        })
        mockedGetGameByName.mockResolvedValueOnce(FOOSBALL_GAME)
        mockedGetPlayerById.mockResolvedValueOnce(TONDA_PLAYER)
          .mockResolvedValueOnce(RADEK_PLAYER)
          .mockResolvedValueOnce(PETR_PLAYER)
        mockedGetLatestMatchByGameId.mockResolvedValueOnce(FOOSBALL_MATCH_WITH_ID)
        mockedStoreMatch.mockResolvedValueOnce(FOOSBALL_MATCH_WITH_ID)
      })
      describe('called one minute later', () => {
        lockDate(ONE_MINUTE_AFTER)
        it('records the match', async () => {
          const expectedMatch = { ...FOOSBALL_MATCH, date: ONE_MINUTE_AFTER }
          expect(await recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION))
            .toEqual(expectedMatch)
          expect(mockedStoreMatch).toBeCalledWith(expectedMatch)
        })
        it('gets latest match by game id', async () => {
          await recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION)
          expect(mockedGetLatestMatchByGameId).toBeCalledWith(FOOSBALL_GAME.id)
        })
      })
      describe('called half of minute before', () => {
        lockDate(HALF_MINUTE_AFTER)
        it('throws with input error', async () => {
          await expect(
            recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION)
          ).rejects.toThrowError(InputError)
        })
        it('doesnt call store match', async () => {
          expect.assertions(1)
          try {
            await recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION)
          } catch {
            expect(mockedStoreMatch).not.toBeCalled()
          }
        })
      })
    })
    describe('when game does not exist', () => {
      beforeEach(() => {
        mockedGetGameByName.mockRejectedValueOnce(ERROR)
      })
      it('throws with input error', async () => {
        expect.assertions(1)
        try {
          await recordMatch('foo', FOOSBALL_MATCH_DESCRIPTION)
        } catch (error) {
          expect(error).toEqual(ERROR)
        }
      })
    })
  })
})
