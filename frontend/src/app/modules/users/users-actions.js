import { createActions } from 'reduxsauce'

export const UsersActions = createActions({
    addUser: ['user'],
    usersLoaded: ['users']
}, {
    prefix: "foosball-rating/users/"
});
