import { RouterActions } from './router-actions'
import { take, takeEvery, select, call, put } from 'redux-saga/effects'
import { selectGameByNameSaga, getGamesSaga } from '../games/games-saga'
import { getSelectedGame } from '../games/games-selectors'
import { matchPath } from 'react-router-dom'
import { GamesActions } from '../games/games-actions'

const matchUrl = url => {
  return matchPath(url, {
    path: '/:gameName',
  })
}
export const urlChangedSaga = function*({ url }) {
  const selectedGame = yield select(getSelectedGame)
  const match = matchUrl(url)
  if (match) {
    const gameName = match.params.gameName
    if (gameName !== selectedGame?.name) {
      yield call(selectGameByNameSaga, GamesActions.Creators.selectGameByName(gameName))
    }
  } else if (selectedGame) {
    yield put(GamesActions.Creators.deselectGame())
  }
}

export const urlInitSaga = function*({ url }) {
  yield call(getGamesSaga)
  const match = matchUrl(url)
  if (match) {
    const gameName = match.params.gameName
    yield call(selectGameByNameSaga, GamesActions.Creators.selectGameByName(gameName))
  }
}

export function* routerSaga() {
  const action = yield take(RouterActions.Types.URL_INIT)
  yield call(urlInitSaga, action)
  yield takeEvery(RouterActions.Types.URL_CHANGED, urlChangedSaga)
}
