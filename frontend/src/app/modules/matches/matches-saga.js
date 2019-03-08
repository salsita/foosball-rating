import { put, takeEvery, fork, call } from 'redux-saga/effects'
import { getMatches, addMatch } from './matches-effects'
import { getUsersSaga } from '../users/users-saga'
import { MatchesActions } from './matches-actions'

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
        yield call(addMatch, action.match)
        yield call(getMatchesSaga)
        // Need to reload users because ratings have changed
        yield call(getUsersSaga)
    } catch (error) {
        console.error(error)
    }
}

export function* matchesSaga() {
    yield fork(getMatchesSaga)
    yield takeEvery(MatchesActions.Types.ADD_MATCH, addMatchSaga)
}
