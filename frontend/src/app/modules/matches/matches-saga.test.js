import { addMatch } from './matches-effects'
import { addMatchSaga } from './matches-saga'
import { call, put, select } from 'redux-saga/effects'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { getPlayersSaga } from '../players/players-saga'
import { getSelectedGame } from '../games/games-selectors'

const MATCH = {}
const FOOSBALL = { name: 'foosball' }
const ERROR = {
  message: 'ERROR',
}

describe('matchesSaga', () => {
  describe('addMatchSaga', () => {
    let gen
    const expectNext = (suppliedValue, expected) => {
      expect(gen.next(suppliedValue)).toStrictEqual(expected)
    }
    const expectThrow = (suppliedValue, expected) => {
      expect(gen.throw(suppliedValue)).toStrictEqual(expected)
    }
    const expectNextUndoneValue = suppliedValue => {
      return {
        toBe: value => {
          expectNext(suppliedValue, { value, done: false })
        },
      }
    }
    const expectThrowUndoneValue = suppliedValue => {
      return {
        toBe: value => {
          expectThrow(suppliedValue, { value, done: false })
        },
      }
    }
    const expectNextDone = suppliedValue => {
      expectNext(suppliedValue, { value: undefined, done: true })
    }
    beforeEach(() => {
      gen = addMatchSaga({
        match: MATCH,
      })
    })
    describe('when addMatch is successful', () => {
      it('performs correctly the sequence', () => {
        expectNextUndoneValue().toBe(select(getSelectedGame))
        expectNextUndoneValue(FOOSBALL)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        expectNextUndoneValue().toBe(call(addMatch, FOOSBALL.name, MATCH))
        expectNextUndoneValue().toBe(put(MatchesActions.Creators.matchAdded(MATCH)))
        expectNextUndoneValue().toBe(call(getPlayersSaga))
        expectNextUndoneValue().toBe(put(MatchesActions.Creators.updateStatus(success)))
        expectNextDone()
      })
    })
    describe('when addMatch fails', () => {
      it('performs correctly the sequence', () => {
        expectNextUndoneValue().toBe(select(getSelectedGame))
        expectNextUndoneValue(FOOSBALL)
          .toBe(put(MatchesActions.Creators.updateStatus(inProgress)))
        expectNextUndoneValue().toBe(call(addMatch, FOOSBALL.name, MATCH))
        expectThrowUndoneValue(ERROR)
          .toBe(put(MatchesActions.Creators.updateStatus(failure(ERROR.message))))
        expectNextDone()
      })
    })
  })
})
