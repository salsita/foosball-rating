import { createActions } from 'reduxsauce'

export const MatchesActions = createActions({
    addMatch: ['match'],
    matchesLoaded: ['matches']
}, {
    prefix: "foosball-rating/matches/"
});
