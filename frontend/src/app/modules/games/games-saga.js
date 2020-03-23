import { put, fork, call, takeEvery, select } from 'redux-saga/effects'
import { GamesActions } from './games-actions'
import { getGames } from './games-effects'
import { MatchesActions } from '../matches/matches-actions'
import { getSelectedGame } from './games-selectors'

export function* getGamesSaga() {
  try {
    const response = yield call(getGames)
    yield put(GamesActions.Creators.gamesLoaded(response.data))
  } catch (error) {
    console.error(error)
  }
}

export function* selectGameSaga(game) {
  yield put(GamesActions.Creators.selectGame(game))
}

export function* selectGameOnGamesLoadedSaga(action) {
  // select foosball as first game as it's the only game right now
  yield call(selectGameSaga, action.games[0])
}

export function* refreshSelectionSaga() {
  const selectedGame = yield select(getSelectedGame)
  yield call(selectGameSaga, selectedGame)
}

export function* gamesSaga() {
  yield fork(getGamesSaga)
  yield takeEvery(GamesActions.Types.GAMES_LOADED, selectGameOnGamesLoadedSaga)
  yield takeEvery(MatchesActions.Types.MATCH_ADDED, refreshSelectionSaga)
}
