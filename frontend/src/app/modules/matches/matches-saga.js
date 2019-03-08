import { put, takeEvery, fork, call, delay } from 'redux-saga/effects'
import { getMatches, addMatch } from './matches-effects'
import { getUsersSaga } from '../users/users-saga'
import { MatchesActions } from './matches-actions'
import { IN_PROGRESS, SUCCESS, FAILURE, READY } from '../api/request-status'

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
        yield put(MatchesActions.Creators.updateStatus(IN_PROGRESS))
        yield call(addMatch, action.match)
        yield call(getMatchesSaga)
        // Need to reload users because ratings have changed
        yield call(getUsersSaga)
        yield put(MatchesActions.Creators.updateStatus(SUCCESS))
        yield fork(resetStatusAfterDelaySaga, 2000)
    } catch (error) {
        yield put(MatchesActions.Creators.updateStatus(FAILURE))
        yield fork(resetStatusAfterDelaySaga, 6000)
        console.error(error)
    }
}

function* resetStatusAfterDelaySaga(delayTime) {
    yield delay(delayTime)
    yield put(MatchesActions.Creators.updateStatus(READY))
}

export function* matchesSaga() {
    yield fork(getMatchesSaga)
    yield takeEvery(MatchesActions.Types.ADD_MATCH, addMatchSaga)
}
