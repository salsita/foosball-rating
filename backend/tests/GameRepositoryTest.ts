import { mocked } from 'ts-jest/utils'
import { FOOSBALL_DATA } from './TestData'

import { insertGame } from '../storage/Storage'
import { addGame } from '../repositories/GameRepository'
import { InputError } from '../errors/InputError'
jest.mock('../storage/Storage')

const mockedInsertGame = mocked(insertGame, true)

describe('GameRepository', () => {
  describe('addGame', () => {
    it.each([
      ['has empty data', '', ''],
      ['has no description', FOOSBALL_DATA.name, ''],
      ['has no name', '', FOOSBALL_DATA.description],
      ['has a not end trimmed name', `${FOOSBALL_DATA.name} `, FOOSBALL_DATA.description],
      ['has a not start trimmed name', ` ${FOOSBALL_DATA.name}`, FOOSBALL_DATA.description],
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
