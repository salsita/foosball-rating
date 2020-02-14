import { fork } from 'redux-saga/effects'
import { usersSaga } from '../users/users-saga'
import { matchesSaga } from '../matches/matches-saga'
import { themeSaga } from '../theme/theme-saga'

export function* rootSaga() {
  yield fork(usersSaga)
  yield fork(matchesSaga)
  yield fork(themeSaga)
}
