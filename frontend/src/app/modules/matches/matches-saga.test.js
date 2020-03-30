import { addMatch } from './matches-effects'
import { addMatchSaga } from './matches-saga'
import { call, put, select } from 'redux-saga/effects'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { getPlayersSaga } from '../players/players-saga'
import { getSelectedGame } from '../games/games-selectors'
import { sagaTest } from '../../../tests/utils'

const MATCH = {}
const FOOSBALL = { name: 'foosball' }
const ERROR = {
  message: 'ERROR',
}

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
        gen.expectNextUndoneValue(FOOSBALL)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addMatch, FOOSBALL.name, MATCH))
        gen.expectNextUndoneValue().toBe(put(MatchesActions.Creators.matchAdded(MATCH)))
        gen.expectNextUndoneValue().toBe(call(getPlayersSaga))
        gen.expectNextUndoneValue().toBe(put(MatchesActions.Creators.updateStatus(success)))
        gen.expectNextDone()
      })
    })
    describe('when addMatch fails', () => {
      it('performs correctly the sequence', () => {
        gen.expectNextUndoneValue().toBe(select(getSelectedGame))
        gen.expectNextUndoneValue(FOOSBALL)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        gen.expectNextUndoneValue().toBe(call(addMatch, FOOSBALL.name, MATCH))
        gen.expectThrowUndoneValue(ERROR)
          .toBe(put(MatchesActions.Creators.updateStatus(failure(ERROR.message))))
        gen.expectNextDone()
      })
    })
  })
})
