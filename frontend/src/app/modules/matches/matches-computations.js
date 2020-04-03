const didPlayerWin = (playerId, match) => {
  const winningTeam = match.team1Won ? match.team1 : match.team2
  return Boolean(winningTeam.find(player => player.id === playerId))
}

const getTeamMates = (playerId, match) => {
  const playerTeam = match.team1.find(player => player.id === playerId) ? match.team1 : match.team2
  return playerTeam.filter(player => player.id !== playerId)
}

const getOpponents = (playerId, match) => {
  return match.team1.find(player => player.id === playerId) ? match.team2 : match.team1
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

export const computeWins = (playerId, playerMatches) =>
  playerMatches.filter(match => didPlayerWin(playerId, match)).length

const findWithComparator = (comparator, obj, field, baseScore) =>
  Object.keys(obj).reduce((acc, key) =>
    comparator(acc.score, obj[key][field])
      ? acc
      : { value: obj[key].value, score: obj[key][field] }
  , { score: baseScore })

export const findMin = (obj, field = 'score') =>
  findWithComparator((e1, e2) => e1 <= e2, obj, field, Infinity)

export const findMax = (obj, field = 'score') =>
  findWithComparator((e1, e2) => e1 >= e2, obj, field, -Infinity)

export const computeDays = matchChanges => {
  const daysMap = {}

  for (const match of matchChanges) {
    const day = match.date.toLocaleDateString()
    const score = Number(match.ratingChangeString)
    if (!Object.hasOwnProperty.call(daysMap, day)) {
      daysMap[day] = {
        value: day,
        score,
      }
    } else {
      daysMap[day].score += score
    }
  }
  return matchChanges.length
    ? daysMap
    : {
      default: {
        value: '',
        score: 0,
      },
    }
}

export const computeTeammates = (playerId, playerMatches) =>
  computePlayers(playerId, playerMatches, getTeamMates) || {}

export const computeOpponents = (playerId, playerMatches) =>
  computePlayers(playerId, playerMatches, getOpponents) || {}

const computePlayers = (playerId, playerMatches, playersProvider) => {
  const playersMap = {}

  for (const match of playerMatches) {
    const players = playersProvider(playerId, match)
    players.map(player =>
      playersMap[player.id] = (!playersMap[player.id]
        ? {
          value: player,
          matches: 1,
          wins: Number(didPlayerWin(playerId, match)),
          losses: Number(!didPlayerWin(playerId, match)),
        }
        : {
          matches: playersMap[player.id]['matches'] + 1,
          wins: playersMap[player.id]['wins'] += Number(didPlayerWin(playerId, match)),
          losses: playersMap[player.id]['losses'] += Number(!didPlayerWin(playerId, match)),
        }
      ))
  }
  return playerMatches.length
    ? playersMap
    : {
      default: {
        value: '',
        matches: 0,
        wins: 0,
        losses: 0,
      },
    }
}
