import { put, takeEvery, call, select } from 'redux-saga/effects'
import { getMatchesByGameName, addMatch } from './matches-effects'
import { getUsersSaga } from '../users/users-saga'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { GamesActions } from '../games/games-actions'
import { getSelectedGame } from '../games/games-selectors'

const convertDateInMatch = match => ({
  ...match,
  date: new Date(match.date),
})

function* getMatchesByGameNameSaga(action) {
  try {
    const response = yield call(getMatchesByGameName, action.selectedGame.name)
    yield put(MatchesActions.Creators.matchesLoaded(response.data.map(convertDateInMatch)))
  } catch (error) {
    console.error(error)
  }
}

export function* addMatchSaga(action) {
  try {
    const selectedGame = yield select(getSelectedGame)
    yield put(MatchesActions.Creators.updateStatus(inProgress))
    yield call(addMatch, selectedGame.name, action.match)
    yield put(MatchesActions.Creators.matchAdded(action.match))
    // Need to reload users because ratings have changed
    yield call(getUsersSaga)
    yield put(MatchesActions.Creators.updateStatus(success))
  } catch (error) {
    console.error(error)
    const message = error.response ? error.response.data : error.message
    yield put(MatchesActions.Creators.updateStatus(failure(message)))
  }
}

export function* matchesSaga() {
  yield takeEvery(GamesActions.Types.SELECT_GAME, getMatchesByGameNameSaga)
  yield takeEvery(MatchesActions.Types.ADD_MATCH, addMatchSaga)
}
