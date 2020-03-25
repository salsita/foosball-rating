import { recordMatch } from './MatchRepository'
import {
  FOOSBALL_GAME,
  FOOSBALL_MATCH_DESCRIPTION,
  FOOSBALL_MATCH,
  TONDA_PLAYER,
  FOOSBALL_MATCH_WITH_ID,
  HALF_MINUTE_AFTER,
  ONE_MINUTE_AFTER,
} from '../tests/TestData'
import { getGameByName, getPlayerById, getLatestMatch, storeMatch } from '../storage/Storage'
import { mocked } from 'ts-jest/utils'
import { computeRatingChanges } from '../rating/rating-calculator'
import { lockDate } from '../tests/mocks'
jest.mock('../storage/Storage')
jest.mock('../rating/rating-calculator')

const mockedGetGameByName = mocked(getGameByName, false)
const mockedGetPlayerById = mocked(getPlayerById, false)
const mockedGetLatestMatch= mocked(getLatestMatch, false)
const mockedStoreMatch = mocked(storeMatch, false)
const mockedComputeRatingChanges = mocked(computeRatingChanges, false)

describe('MatchRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('recordMatch', () => {
    beforeEach(() => {
      mockedComputeRatingChanges.mockReturnValueOnce({
        winningTeamRatingChange: FOOSBALL_MATCH_WITH_ID.winningTeamRatingChange,
        losingTeamRatingChange: FOOSBALL_MATCH_WITH_ID.losingTeamRatingChange,
      })
      mockedGetGameByName.mockResolvedValueOnce(FOOSBALL_GAME)
      mockedGetPlayerById.mockResolvedValue(TONDA_PLAYER)
      mockedGetLatestMatch.mockResolvedValueOnce(FOOSBALL_MATCH_WITH_ID)
      mockedStoreMatch.mockResolvedValueOnce(undefined)
    })
    describe('called one minute later', () => {
      lockDate(ONE_MINUTE_AFTER)
      it('records the match', async () => {
        const expectedMatch = { ...FOOSBALL_MATCH, date: ONE_MINUTE_AFTER }
        expect(await recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION))
          .toEqual(expectedMatch)
        expect(mockedStoreMatch).toBeCalledWith(expectedMatch)
      })
    })
    describe('called half of minute before', () => {
      lockDate(HALF_MINUTE_AFTER)
      it('throws with error', async () => {
        await expect(
          recordMatch(FOOSBALL_GAME.name, FOOSBALL_MATCH_DESCRIPTION)
        ).rejects.toThrowError(Error)
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
})
