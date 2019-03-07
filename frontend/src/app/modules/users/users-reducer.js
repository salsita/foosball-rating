import { createReducer } from 'reduxsauce'

import { UsersActions } from './users-actions'

const initState = {
    users: []
}

const usersLoaded = (state, { users }) => {
    return {
        users: users
    }
}

export const usersReducer = createReducer(initState, {
    [UsersActions.Types.USERS_LOADED]: usersLoaded
})
