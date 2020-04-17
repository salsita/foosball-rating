import { addMatch } from './matches-effects'
import { addMatchSaga } from './matches-saga'
import { call, put, select } from 'redux-saga/effects'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { getSelectedGame } from '../games/games-selectors'
import { sagaTest } from '../../../tests/utils'
import { FOOSBALL_GAME, ERROR, MATCH } from '../../../tests/data'

describe('matchesSaga', () => {
  describe('addMatchSaga', () => {
    let gen
    beforeEach(() => {
      gen = sagaTest(addMatchSaga({
        match: MATCH,
      }))
    })
    describe('when addMatch is successful', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL_GAME)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addMatch, FOOSBALL_GAME.name, MATCH))
        gen.expectNextUndoneValue().toBe(put(MatchesActions.Creators.matchAdded(MATCH)))
        gen.expectNextUndoneValue().toBe(put(MatchesActions.Creators.updateStatus(success)))
        gen.expectNextDone()
      })
    })
    describe('when addMatch fails', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL_GAME)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addMatch, FOOSBALL_GAME.name, MATCH))
        gen.expectThrowUndoneValue(ERROR)
          .toBe(put(MatchesActions.Creators.updateStatus(failure(ERROR.message))))
        gen.expectNextDone()
      })
    })
  })
})
