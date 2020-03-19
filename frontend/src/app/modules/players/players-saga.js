import { put, takeEvery, call, select } from 'redux-saga/effects'
import { getUsers, addUser } from './players-effects'
import { UsersActions } from './players-actions'
import { inProgress, success, failure } from '../api/request-status'
import { GamesActions } from '../games/games-actions'

export function* getUsersSaga(action) {
  try {
    const response = yield call(getUsers, action.selectedGame.name)
    yield put(UsersActions.Creators.usersLoaded(response.data))
  } catch (error) {
    console.error(error)
  }
}

function* addUserSaga(action) {
  try {
    const state = yield select()
    yield put(UsersActions.Creators.updateStatus(inProgress))
    yield call(addUser, state.selectedGame.name, action.user)
    yield call(getUsersSaga)
    yield put(UsersActions.Creators.updateStatus(success))
  } catch (error) {
    console.error(error)
    const message = error.response ? error.response.data : error.message
    yield put(UsersActions.Creators.updateStatus(failure(message)))
  }
}

export function* usersSaga() {
  yield takeEvery(GamesActions.Types.SELECT_GAME, getUsersSaga)
  yield takeEvery(UsersActions.Types.ADD_USER, addUserSaga)
}
