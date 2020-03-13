import { put, fork, call, takeEvery } from 'redux-saga/effects'
import { GamesActions } from './games-actions'
import { getGames } from './games-effects'

export function* getGamesSaga() {
  try {
    const response = yield call(getGames)
    yield put(GamesActions.Creators.gamesLoaded(response.data))
  } catch (error) {
    console.error(error)
  }
}

export function* selectGameSaga(action) {
  yield put(GamesActions.Creators.selectGame(action.games[0]))
}

export function* gamesSaga() {
  yield fork(getGamesSaga)
  yield takeEvery(GamesActions.Types.GAMES_LOADED, selectGameSaga)
}
