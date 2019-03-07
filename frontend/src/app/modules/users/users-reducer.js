import { createReducer } from 'reduxsauce'

import UserActions from './users-actions'

const initState = {
    users: []
}

const usersLoaded = (state, { users }) => {
    return {
        users: users
    }
}

const usersReducer = createReducer(initState, {
    [UserActions.Types.USERS_LOADED]: usersLoaded
})

export default usersReducer
