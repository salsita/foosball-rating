import { createActions } from 'reduxsauce'

const Actions = createActions({
    addUser: ['user'],
    usersLoaded: ['users']
}, {
    prefix: "foosball-rating/users/"
});

export default Actions
