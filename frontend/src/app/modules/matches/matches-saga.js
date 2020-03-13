import { put, takeEvery, call, take } from 'redux-saga/effects'
import { addMatch } from './matches-effects'
import { getUsersSaga } from '../users/users-saga'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure } from '../api/request-status'
import { GamesActions } from '../games/games-actions'
import { getGameById } from '../games/games-effects'

const convertDateInMatch = match => ({
  ...match,
  date: new Date(match.date),
})

function* getMatchesByGameIdSaga(gameId) {
  try {
    const response = yield call(getGameById, gameId)
    const matches = response.data.matches.map(convertDateInMatch)
    yield put(MatchesActions.Creators.matchesLoaded(matches))
  } catch (error) {
    console.error(error)
  }
}

function* addMatchSaga(action) {
  try {
    yield put(MatchesActions.Creators.updateStatus(inProgress))
    yield call(addMatch, action.match)
    yield call(getMatchesByGameIdSaga, action.match.gameId)
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
  const action = yield take(GamesActions.Types.SELECT_GAME)
  yield call(getMatchesByGameIdSaga, action.selectedGame.id)
  yield takeEvery(MatchesActions.Types.ADD_MATCH, addMatchSaga)
}
