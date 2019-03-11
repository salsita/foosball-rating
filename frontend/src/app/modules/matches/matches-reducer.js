import { createReducer } from 'reduxsauce'

import { MatchesActions } from './matches-actions'
import { READY } from '../api/request-status'


const initialState = {
    status: READY,
    matches: []
}

const matchesLoaded = (state, { matches }) => {
    return {
        ...state,
        matches
    }
}

const updateStatus = (state, { status }) => {
    return {
        ...state,
        status
    }
}

export const matchesReducer = createReducer(initialState, {
    [MatchesActions.Types.MATCHES_LOADED]: matchesLoaded,
    [MatchesActions.Types.UPDATE_STATUS]: updateStatus
})
