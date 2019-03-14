import { createActions } from 'reduxsauce'

export const RootActions = createActions({
    dismissAlert: [],
    dismissRedirect: [],
}, {
    prefix: "foosball-rating/root/"
});
