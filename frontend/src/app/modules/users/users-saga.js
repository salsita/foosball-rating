import { put, takeEvery, fork, call } from 'redux-saga/effects'
import { getUsers, addUser } from './users-effects'
import { UsersActions } from './users-actions'

function* getUsersSaga() {
    try {
        const response = yield call(getUsers)
        yield put(UsersActions.Creators.usersLoaded(response.data))
    } catch (error) {
        console.error(error)
    }
}

function* addUserSaga(action) {
    try {
        yield call(addUser, action.user)
        yield call(getUsersSaga)
    } catch (error) {
        console.error(error)
    }
}

export function* usersSaga() {
    yield fork(getUsersSaga)
    yield takeEvery(UsersActions.Types.ADD_USER, addUserSaga)
}
