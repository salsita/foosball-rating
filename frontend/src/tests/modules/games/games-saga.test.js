import { getGames } from '../../../app/modules/games/games-effects'
import { getGamesSaga } from '../../../app/modules/games/games-saga'
import { call, put } from 'redux-saga/effects'
import { GamesActions } from '../../../app/modules/games/games-actions'
jest.mock('../../../app/modules/games/games-effects')

const RESPONSE = {
  data: {},
}

describe('gameSaga', () => {
  describe('getGamesSaga', () => {
    let gen
    beforeEach(() => {
      getGames.mockResolvedValue(true)
      gen = getGamesSaga()
    })
    it('yields to getGames', () => {
      expect(gen.next().value).toStrictEqual(call(getGames))
    })
    describe('after getGames call resolves with Data', () => {
      beforeEach(() => {
        gen.next()
      })
      it('puts a gamesLoaded action with this data', () => {
        expect(gen.next(RESPONSE).value)
          .toStrictEqual(put(GamesActions.Creators.gamesLoaded(RESPONSE.data)))
      })
    })
  })
})
