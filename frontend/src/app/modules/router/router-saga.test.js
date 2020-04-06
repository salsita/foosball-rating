import { urlChangedSaga, urlInitSaga } from './router-saga'
import { getSelectedGame } from '../games/games-selectors'
import { select, put, call } from 'redux-saga/effects'
import { GamesActions } from '../games/games-actions'
import { selectGameByNameSaga, getGamesSaga } from '../games/games-saga'
import { RouterActions } from './router-actions'
import { sagaTest } from '../../../tests/utils'
import { FOOSBALL_GAME, URLS, SQUASH_GAME } from '../../../tests/data'

describe('urlChangedSaga', () => {
  let gen
  describe('called with root URL', () => {
    beforeEach(() => {
      gen = sagaTest(urlChangedSaga(RouterActions.Creators.urlChanged(URLS.ROOT)))
    })
    describe('when selected game is foosball', () => {
      it('deselects foosball', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL_GAME).toBe(put(GamesActions.Creators.deselectGame()))
        gen.expectNextDone()
      })
    })
    describe('when no game is selected', () => {
      it('does nothing', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextDone(null)
      })
    })
  })
  describe('called with squash URL', () => {
    beforeEach(() => {
      gen = sagaTest(urlChangedSaga({ url: URLS.SQUASH }))
    })
    describe('when selected game is squash', () => {
      it('does nothing', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextDone(SQUASH_GAME)
      })
    })
    describe.each([
      [FOOSBALL_GAME],
      [null],
    ])('when selected game is %o', selectedGame => {
      it('selects squash', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(selectedGame).toBe(
          call(selectGameByNameSaga, GamesActions.Creators.selectGameByName(SQUASH_GAME.name)))
        gen.expectNextDone()
      })
    })
  })
})

describe('urlInitSaga', () => {
  let gen
  describe('called with root URL', () => {
    beforeEach(() => {
      gen = sagaTest(urlInitSaga({ url: URLS.ROOT }))
    })
    it('get games', () => {
      gen.expectNextUndoneValue().toBe(call(getGamesSaga))
      gen.expectNextDone()
    })
  })
  describe('called with foosball URL', () => {
    beforeEach(() => {
      gen = sagaTest(urlInitSaga({ url: URLS.FOOSBALL }))
    })
    it('selects foosball', () => {
      gen.expectNextUndoneValue().toBe(call(getGamesSaga))
      gen.expectNextUndoneValue().toBe(
        call(selectGameByNameSaga, GamesActions.Creators.selectGameByName('foosball')))
      gen.expectNextDone()
    })
  })
})
