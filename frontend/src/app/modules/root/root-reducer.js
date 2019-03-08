import { combineReducers } from 'redux'
import { usersReducer } from '../users/users-reducer'
import { matchesReducer } from '../matches/matches-reducer'

export const rootReducer = combineReducers({
    users: usersReducer,
    matches: matchesReducer
})
