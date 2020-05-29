const didPlayerWin = (playerId, match) => {
  const winningTeam = match.team1Score > match.team2Score ? match.team1 : match.team2
  return Boolean(winningTeam.find(player => player.id === playerId))
}

export const generateMatchRatingChanges = (playerId, playerMatches) => playerMatches.map(match => {
  const didWin = didPlayerWin(playerId, match)
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

export const plotRatingHistory = (playerMatches, playerId, initialRating) => {
  const reversedPlayerMatches = playerMatches.reverse()
  const firstMatchDate = playerMatches[0] && playerMatches[0].date
  const graphStartDate = firstMatchDate ? new Date(firstMatchDate) : new Date()
  if (firstMatchDate) {
    graphStartDate.setDate(firstMatchDate.getDate() - 1)
  }
  return [{ x: graphStartDate, y: initialRating }]
    .concat(reversedPlayerMatches.map(
      function (match) {
        const didWin = didPlayerWin(playerId, match)
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

export const computeLongestWinStreak = (playerId, playerMatches) => {
  const initialState = {
    longest: 0,
    current: 0,
  }

  return playerMatches.reduce((state, match) => {
    if (didPlayerWin(playerId, match)) {
      const current = state.current + 1
      const longest = Math.max(current, state.longest)
      return {
        current,
        longest,
      }
    } else {
      return {
        longest: state.longest,
        current: 0,
      }
    }
  }, initialState).longest
}

export const computeWinRatio = (playerId, playerMatches) => {
  const wonMatchesCount = playerMatches.filter(match => didPlayerWin(playerId, match)).length
  return (playerMatches.length > 0) ? (wonMatchesCount / playerMatches.length) : 0
}
