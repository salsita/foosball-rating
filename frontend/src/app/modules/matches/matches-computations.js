const didUserWin = (userId, match) => {
    const winningTeam = match.team1Won ? match.team1 : match.team2
    return Boolean(winningTeam.find((player) => player.id == userId))
}

export const generateMatchRatingChanges = (userId, userMatches) => userMatches.map((match) => {
    const didWin = didUserWin(userId, match)
    const ratingChangeString = didWin
      ? `+${match.winningTeamRatingChange}`
      : `${match.losingTeamRatingChange}`

    return {
        id: match.id,
        date: match.date,
        didWin,
        ratingChangeString
    }
})

export const generateRatingHistoryGraphForUser = (userMatches, userId, initialRating) => {
  const reversedUserMatches = userMatches.reverse()
  const firstMatchDate = userMatches[0] ? userMatches[0].date : null
  const graphStartDate = firstMatchDate ? new Date(firstMatchDate) : new Date()
  if (firstMatchDate) {
    graphStartDate.setDate(firstMatchDate.getDate() - 1)
  }
  return [{ x: graphStartDate, y: initialRating }]
    .concat(reversedUserMatches.map(
      function(match) {
        const didWin = didUserWin(userId, match)
        const change = didWin ? match.winningTeamRatingChange : match.losingTeamRatingChange

        this.rating += change

        return {
          y: this.rating,
          x: match.date
        }
      },
      { rating: initialRating }
    ))
}

export const computeLongestWinStreak = (userId, userMatches) => {
    const initialState = {
        longest: 0,
        current: 0
    }

    return userMatches.reduce((state, match) => {
        if (didUserWin(userId, match)) {
            const current = state.current + 1
            const longest = Math.max(current, state.longest)
            return {
                current,
                longest
            }
        } else {
            return {
                longest: state.longest,
                current: 0
            }
        }
    }, initialState).longest
}

export const computeWinRatio = (userId, userMatches) => {
    const wonMatchesCount = userMatches.filter((match) => didUserWin(userId, match)).length
    return (userMatches.length > 0) ? (wonMatchesCount / userMatches.length) : 0
}
