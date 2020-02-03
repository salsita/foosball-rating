import { put, takeEvery, fork, call } from 'redux-saga/effects'
import { getUsers, addUser } from './users-effects'
import { UsersActions } from './users-actions'
import { inProgress, success, failure } from '../api/request-status'

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
    yield put(UsersActions.Creators.updateStatus(inProgress))
    yield call(addUser, action.user)
    yield call(getUsersSaga)
    yield put(UsersActions.Creators.updateStatus(success))
  } catch (error) {
    console.error(error)
    const message = error.response ? error.response.data : error.message
    yield put(UsersActions.Creators.updateStatus(failure(message)))
  }
}

export function* usersSaga() {
  yield fork(getUsersSaga)
  yield takeEvery(UsersActions.Types.ADD_USER, addUserSaga)
}
