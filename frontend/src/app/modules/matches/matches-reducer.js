import { createReducer } from 'reduxsauce'

import { MatchesActions } from './matches-actions'

const initState = {
    matches: []
}

const matchesLoaded = (state, { matches }) => {
    return {
        matches: matches
    }
}

export const matchesReducer = createReducer(initState, {
    [MatchesActions.Types.MATCHES_LOADED]: matchesLoaded
})
