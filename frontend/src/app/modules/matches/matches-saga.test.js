import { addMatch } from './matches-effects'
import { addMatchSaga } from './matches-saga'
import { call, put, select } from 'redux-saga/effects'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { getUsersSaga } from '../users/users-saga'
import { getSelectedGame } from '../games/games-selectors'

const MATCH = {}
const FOOSBALL = { name: 'foosball' }
const ERROR = {
  message: 'ERROR',
}

describe('matchesSaga', () => {
  describe('addMatchSaga', () => {
    let gen
    const expectNextToBe = (value, done = false) => {
      const result = gen.next()
      expect(result.value).toStrictEqual(value)
      expect(result.done).toBe(done)
    }
    const expectDone = () => {
      expectNextToBe(undefined, true)
    }
    beforeEach(() => {
      gen = addMatchSaga({
        match: MATCH,
      })
    })
    describe('when addMatch is successful', () => {
      it('performs correctly the sequence', () => {
        expectNextToBe(select(getSelectedGame))
        expect(gen.next(FOOSBALL).value)
          .toStrictEqual(put(MatchesActions.Creators.updateStatus(inProgress)))
        expectNextToBe(call(addMatch, FOOSBALL.name, MATCH))
        expectNextToBe(put(MatchesActions.Creators.matchAdded(MATCH)))
        expectNextToBe(call(getUsersSaga))
        expectNextToBe(put(MatchesActions.Creators.updateStatus(success)))
        expectDone()
      })
    })
    describe('when addMatch fails', () => {
      it('performs correctly the sequence', () => {
        expectNextToBe(select(getSelectedGame))
        expect(gen.next(FOOSBALL).value)
          .toStrictEqual(put(MatchesActions.Creators.updateStatus(inProgress)))
        expectNextToBe(call(addMatch, FOOSBALL.name, MATCH))
        expect(gen.throw(ERROR).value)
          .toStrictEqual(put(MatchesActions.Creators.updateStatus(failure(ERROR.message))))
        expectDone()
      })
    })
  })
})
