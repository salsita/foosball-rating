import { createReducer } from 'reduxsauce'

import { MatchesActions } from './matches-actions'
import { ready } from '../api/request-status'


const initialState = {
    status: ready,
    matches: []
}

const matchesLoaded = (state, { matches }) => ({
    ...state,
    matches
})

const updateStatus = (state, { status }) => ({
    ...state,
    status
})

export const matchesReducer = createReducer(initialState, {
    [MatchesActions.Types.MATCHES_LOADED]: matchesLoaded,
    [MatchesActions.Types.UPDATE_STATUS]: updateStatus
})
