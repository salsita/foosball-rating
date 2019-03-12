import { put, takeEvery, fork, call, delay } from 'redux-saga/effects'
import { getMatches, addMatch } from './matches-effects'
import { getUsersSaga } from '../users/users-saga'
import { MatchesActions } from './matches-actions'
import { inProgress, success, failure, ready } from '../api/request-status'

const convertDateInMatch = (match) => ({
    ...match,
    date: new Date(match.date)
})

function* getMatchesSaga() {
    try {
        const response = yield call(getMatches)
        const matches = response.data.map(convertDateInMatch)
        yield put(MatchesActions.Creators.matchesLoaded(matches))
    } catch (error) {
        console.error(error)
    }
}

function* addMatchSaga(action) {
    try {
        yield put(MatchesActions.Creators.updateStatus(inProgress))
        yield call(addMatch, action.match)
        yield call(getMatchesSaga)
        // Need to reload users because ratings have changed
        yield call(getUsersSaga)
        yield fork(setTemporaryStatusSaga, success, 2000)
    } catch (error) {
        console.error(error)
        yield put(MatchesActions.Creators.updateStatus(failure(error.response.data)))
    }
}

function* setTemporaryStatusSaga(status, time) {
    yield put(MatchesActions.Creators.updateStatus(status))
    yield delay(time)
    yield put(MatchesActions.Creators.updateStatus(ready))
}

export function* matchesSaga() {
    yield fork(getMatchesSaga)
    yield takeEvery(MatchesActions.Types.ADD_MATCH, addMatchSaga)
}
