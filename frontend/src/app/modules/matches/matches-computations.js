const didUserWin = (userId, match) => {
  const winningTeam = match.team1Won ? match.team1 : match.team2
  return Boolean(winningTeam.find(player => player.id === userId))
}

export const generateMatchRatingChanges = (userId, userMatches) => userMatches.map(match => {
  const didWin = didUserWin(userId, match)
  const ratingChangeString = didWin
    ? `+${match.winningTeamRatingChange}`
    : `${match.losingTeamRatingChange}`

  return {
    id: match.id,
    date: match.date,
    didWin,
    ratingChangeString,
  }
})

export const plotRatingHistory = (userMatches, userId, initialRating) => {
  const reversedUserMatches = userMatches.reverse()
  const firstMatchDate = userMatches[0] && userMatches[0].date
  const graphStartDate = firstMatchDate ? new Date(firstMatchDate) : new Date()
  if (firstMatchDate) {
    graphStartDate.setDate(firstMatchDate.getDate() - 1)
  }
  return [{ x: graphStartDate, y: initialRating }]
    .concat(reversedUserMatches.map(
      function (match) {
        const didWin = didUserWin(userId, match)
        const change = didWin ? match.winningTeamRatingChange : match.losingTeamRatingChange

        this.rating += change

        return {
          y: this.rating,
          x: match.date,
        }
      },
      { rating: initialRating },
    ))
}

export const computeStreaks = (userId, userMatches) => {
  const initialState = {
    longestWinStreak: 0,
    currentWinStreak: 0,
    highestEloGainStreak: 0,
    currentEloGainStreak: 0,
  }

  const reversedMatches = [...userMatches].reverse()

  return reversedMatches.reduce((state, match) => {
    if (didUserWin(userId, match)) {
      const currentWinStreak = state.currentWinStreak + 1
      const longestWinStreak = Math.max(currentWinStreak, state.longestWinStreak)
      const currentEloGainStreak = state.currentEloGainStreak + match.winningTeamRatingChange
      const highestEloGainStreak = Math.max(currentEloGainStreak, state.highestEloGainStreak)
      return {
        currentWinStreak,
        longestWinStreak,
        currentEloGainStreak,
        highestEloGainStreak,
      }
    } else {
      return {
        longestWinStreak: state.longestWinStreak,
        currentWinStreak: 0,
        highestEloGainStreak: state.highestEloGainStreak,
        currentEloGainStreak: 0,
      }
    }
  }, initialState)
}

export const computeWinRatio = (userId, userMatches) => {
  const wonMatchesCount = userMatches.filter(match => didUserWin(userId, match)).length
  return (userMatches.length > 0) ? (wonMatchesCount / userMatches.length) : 0
}
