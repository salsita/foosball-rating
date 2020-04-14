import { put, call, takeEvery, select } from 'redux-saga/effects'
import { GamesActions } from './games-actions'
import { getGames } from './games-effects'
import { MatchesActions } from '../matches/matches-actions'
import { getSelectedGame, selectGames } from './games-selectors'
import { PlayersActions } from '../players/players-actions'

export function* getGamesSaga() {
  try {
    const response = yield call(getGames)
    yield put(GamesActions.Creators.gamesLoaded(response.data))
  } catch (error) {
    console.error(error)
  }
}

export function* selectGame(game) {
  yield put(GamesActions.Creators.selectGame(game))
}

export function* refreshSelectionSaga() {
  const selectedGame = yield select(getSelectedGame)
  yield call(selectGame, selectedGame)
}

export function* selectGameByNameSaga({ gameName }) {
  const games = yield select(selectGames)
  const game = games.find(game => game.name === gameName)
  if (game) {
    yield call(selectGame, game)
  } else {
    yield put(GamesActions.Creators.selectionFailed(gameName))
  }
}

export function* gamesSaga() {
  yield takeEvery(GamesActions.Types.SELECT_GAME_BY_NAME, selectGameByNameSaga)
  yield takeEvery(MatchesActions.Types.MATCH_ADDED, refreshSelectionSaga)
  yield takeEvery(PlayersActions.Types.PLAYER_ADDED, refreshSelectionSaga)
}
