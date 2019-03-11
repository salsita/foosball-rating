import { createReducer } from 'reduxsauce'

import { UsersActions } from './users-actions'
import { READY } from '../api/request-status'

const initialState = {
    status: READY,
    users: []
}

const usersLoaded = (state, { users }) => ({
    ...state,
    users
})

const updateStatus = (state, { status }) => ({
    ...state,
    status
})

export const usersReducer = createReducer(initialState, {
    [UsersActions.Types.USERS_LOADED]: usersLoaded,
    [UsersActions.Types.UPDATE_STATUS]: updateStatus
})
