import { mocked } from 'ts-jest/utils'
import { FOOSBALL_DATA } from '../tests/TestData'

import { insertGame } from '../storage/Storage'
import { addGame } from './GameRepository'
import { InputError } from '../errors/InputError'
jest.mock('../storage/Storage')

const mockedInsertGame = mocked(insertGame, true)

describe('GameRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('addGame', () => {
    it.each([
      ['has not a game data', undefined, undefined],
      ['has nulls', null, null],
      ['has empty data', '', ''],
      ['has no description', FOOSBALL_DATA.name, ''],
      ['has no name', '', FOOSBALL_DATA.description],
      ['has a not end trimmed name', `${FOOSBALL_DATA.name} `, FOOSBALL_DATA.description],
      ['has a not start trimmed name', ` ${FOOSBALL_DATA.name}`, FOOSBALL_DATA.description],
      ['has an upper case char in name', 'Foosball', FOOSBALL_DATA.description],
      ['has a space inside name', 'foos ball', FOOSBALL_DATA.description],
      ['has a not end trimmed description', FOOSBALL_DATA.name, `${FOOSBALL_DATA.description} `],
      ['has a not start trimmed description', FOOSBALL_DATA.name, ` ${FOOSBALL_DATA.description}`],
    ])('throws an InputError if game data %s', async (testDescription, name, description) => {
      await expect(addGame({ name, description })).rejects.toThrowError(InputError)
    })
    describe('when insertGame resolves', () => {
      beforeEach(() => {
        mockedInsertGame.mockResolvedValue(undefined)
      })
    })
    it('stores a valid foosball data via insertGame', async () => {
      await addGame(FOOSBALL_DATA)
      expect(insertGame).toBeCalledTimes(1)
      expect(insertGame).toBeCalledWith(FOOSBALL_DATA)
    })
  })
})
