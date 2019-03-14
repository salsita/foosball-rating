import { createSelector } from "reselect"
import { generateMatchRatingChanges, computeLongestWinStreak, computeWinRatio } from "./matches-computations";

const fillUsers = (team, state) => team.map(player => {
    const user = state.users.find(user => user.id == player.id)
    return {
        ...user,
        matchRating: player.matchRating
    }
})

const getMatches = (state) => state.matches.map(match => ({
    ...match,
    team1: fillUsers(match.team1, state),
    team2: fillUsers(match.team2, state)
}))

const didUserPlayMatch = (userId, match) => {
    const allPlayers = [...match.team1, ...match.team2]
    return allPlayers.find((player) => player.id == userId)
}

export const getLastMatches = createSelector(
    getMatches,
    matches => [...matches].sort((match1, match2) => match2.date - match1.date) 
)

const getLastMatchesForUser = createSelector(
    getLastMatches,
    (state, userId) => userId,
    (matches, userId) => matches.filter((match) => didUserPlayMatch(userId, match))
)

const generateStatisticsForUser = (userId, userMatches) => ({
    matchChanges: generateMatchRatingChanges(userId, userMatches),
    longestStreak: computeLongestWinStreak(userId, userMatches),
    winRatio: computeWinRatio(userId, userMatches),
    totalMatches: userMatches.length
})

export const getStatisticsForUser = createSelector(
    getLastMatchesForUser,
    (state, userId) => userId,
    (userMatches, userId) => generateStatisticsForUser(userId, userMatches)
)
