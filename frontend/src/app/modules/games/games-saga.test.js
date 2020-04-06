import { getGames } from './games-effects'
import { getGamesSaga, selectGameByNameSaga, selectGame } from './games-saga'
import { call, put, select } from 'redux-saga/effects'
import { GamesActions } from './games-actions'
import { selectGames } from './games-selectors'
import { sagaTest } from '../../../tests/utils'
import { FOOSBALL_GAME } from '../../../tests/data'

describe('gameSaga', () => {
  let gen
  describe('getGamesSaga', () => {
    beforeEach(() => {
      gen = sagaTest(getGamesSaga())
    })
    it('performs correctly the sequence', () => {
      gen.expectNextUndoneValue().toBe(call(getGames))
      gen.expectNextUndoneValue({ data: [FOOSBALL_GAME] })
        .toBe(put(GamesActions.Creators.gamesLoaded([FOOSBALL_GAME])))
      gen.expectNextDone()
    })
  })
  describe('selectGameByNameSaga', () => {
    beforeEach(() => {
      gen =
        sagaTest(selectGameByNameSaga(GamesActions.Creators.selectGameByName(FOOSBALL_GAME.name)))
    })
    describe('when foosball exists', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(selectGames))
        gen.expectNextUndoneValue([FOOSBALL_GAME]).toBe(call(selectGame, FOOSBALL_GAME))
        gen.expectNextDone()
      })
    })
    describe('when foosball does not exist', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(selectGames))
        gen.expectNextUndoneValue([])
          .toBe(put(GamesActions.Creators.notFoundGame(FOOSBALL_GAME.name)))
        gen.expectNextDone()
      })
    })
  })
})
