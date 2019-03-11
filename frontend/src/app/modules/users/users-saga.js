import { put, takeEvery, fork, call, delay } from 'redux-saga/effects'
import { getUsers, addUser } from './users-effects'
import { UsersActions } from './users-actions'
import { IN_PROGRESS, SUCCESS, FAILURE, READY } from '../api/request-status';

export function* getUsersSaga() {
    try {
        const response = yield call(getUsers)
        yield put(UsersActions.Creators.usersLoaded(response.data))
    } catch (error) {
        console.error(error)
    }
}

function* addUserSaga(action) {
    try {
        yield put(UsersActions.Creators.updateStatus(IN_PROGRESS))
        yield call(addUser, action.user)
        yield call(getUsersSaga)
        yield fork(setTemporaryStatusSaga, SUCCESS, 2000)
    } catch (error) {
        console.error(error)
        yield fork(setTemporaryStatusSaga, FAILURE, 6000)
    }
}

function* setTemporaryStatusSaga(status, time) {
    yield put(UsersActions.Creators.updateStatus(status))
    yield delay(time)
    yield put(UsersActions.Creators.updateStatus(READY))
}

export function* usersSaga() {
    yield fork(getUsersSaga)
    yield takeEvery(UsersActions.Types.ADD_USER, addUserSaga)
}
