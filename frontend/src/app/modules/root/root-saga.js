import { fork } from 'redux-saga/effects'
import usersSaga from '../users/users-saga' 

export default function* rootSaga() {
    yield fork(usersSaga)
}
