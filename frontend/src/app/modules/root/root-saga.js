import { fork } from 'redux-saga/effects'
import { usersSaga } from '../users/users-saga'
import { matchesSaga } from '../matches/matches-saga'

export function* rootSaga() {
  yield fork(usersSaga)
  yield fork(matchesSaga)
}
