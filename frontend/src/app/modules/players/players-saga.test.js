import { addPlayerSaga } from './players-saga'
import { call, put, select } from 'redux-saga/effects'
import { inProgress, success, failure } from '../api/request-status'
import { getSelectedGame } from '../games/games-selectors'
import { sagaTest } from '../../../tests/utils'
import { addPlayer } from './players-effects'
import { RADEK, FOOSBALL_GAME, ERROR } from '../../../tests/data'
import { PlayersActions } from './players-actions'

describe('players saga', () => {
  describe('addPlayerSaga', () => {
    let gen
    beforeEach(() => {
      gen = sagaTest(addPlayerSaga({
        player: RADEK,
      }))
    })
    describe('when addPlayer is successful', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL_GAME)
          .toBe(put(PlayersActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addPlayer, FOOSBALL_GAME.name, RADEK))
        gen.expectNextUndoneValue().toBe(put(PlayersActions.Creators.playerAdded()))
        gen.expectNextUndoneValue().toBe(put(PlayersActions.Creators.updateStatus(success)))
        gen.expectNextDone()
      })
    })
    describe('when addPlayer fails', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL_GAME)
          .toBe(put(PlayersActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addPlayer, FOOSBALL_GAME.name, RADEK))
        gen.expectThrowUndoneValue(ERROR)
          .toBe(put(PlayersActions.Creators.updateStatus(failure(ERROR.message))))
        gen.expectNextDone()
      })
    })
  })
})
