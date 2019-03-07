import { createSelector } from "reselect"

export const getUsers = state => {
    return state.users.users
}

export const getTopUsers = createSelector(
    getUsers, 
    users => [...users].sort((user1, user2) => user2.rating - user1.rating)
)
