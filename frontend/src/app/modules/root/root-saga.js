import { fork } from 'redux-saga/effects'
import { playersSaga } from '../players/players-saga'
import { matchesSaga } from '../matches/matches-saga'
import { themeSaga } from '../theme/theme-saga'
import { gamesSaga } from '../games/games-saga'

export function* rootSaga() {
  yield fork(playersSaga)
  yield fork(matchesSaga)
  yield fork(gamesSaga)
  yield fork(themeSaga)
}
