import { createReducer } from 'reduxsauce'

import { UsersActions } from './users-actions'
import { ready } from '../api/request-status'

const initialState = {
    status: ready,
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
