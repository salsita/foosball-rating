import { createSelector } from "reselect"

const fillUsers = (team, state) => team.map(player => {
    const user = state.users.users.find(user => user.id == player.id)
    return {
        ...user,
        matchRating: player.matchRating
    }
})

const getMatches = (state) => state.matches.matches.map(match => ({
    ...match,
    team1: fillUsers(match.team1, state),
    team2: fillUsers(match.team2, state)
}))

export const getLastMatches = createSelector(
    getMatches, 
    matches => [...matches].sort((match1, match2) => match2.date - match1.date) 
)
