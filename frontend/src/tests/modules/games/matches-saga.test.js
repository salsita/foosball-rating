import { addMatch } from '../../../app/modules/matches/matches-effects'
import { addMatchSaga } from '../../../app/modules/matches/matches-saga'
import { call, put } from 'redux-saga/effects'
import { MatchesActions } from '../../../app/modules/matches/matches-actions'
import { inProgress, success, failure } from '../../../app/modules/api/request-status'
import { getUsersSaga } from '../../../app/modules/users/users-saga'

const MATCH = {}
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
        expectNextToBe(put(MatchesActions.Creators.updateStatus(inProgress)))

        expectNextToBe(call(addMatch, MATCH))

        expectNextToBe(put(MatchesActions.Creators.matchAdded(MATCH)))

        expectNextToBe(call(getUsersSaga))

        expectNextToBe(put(MatchesActions.Creators.updateStatus(success)))

        expectDone()
      })
    })
    describe('when addMatch fails', () => {
      it('performs correctly the sequence', () => {
        expectNextToBe(put(MatchesActions.Creators.updateStatus(inProgress)))

        expectNextToBe(call(addMatch, MATCH))
        expect(gen.throw(ERROR).value)
          .toStrictEqual(put(MatchesActions.Creators.updateStatus(failure(ERROR.message))))
        expectDone()
      })
    })
  })
})
