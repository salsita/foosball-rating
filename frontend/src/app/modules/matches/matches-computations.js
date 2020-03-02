const didPlayerWin = (playerId, match) => {
  const winningTeam = match.team1Won ? match.team1 : match.team2
  return Boolean(winningTeam.find(player => player.id === playerId))
}

const getTeamMates = (userId, match) => {
  const userTeam = match.team1.find(player => player.id === userId) ? match.team1 : match.team2
  return userTeam.filter(player => player.id != userId)
}

const getOpponents = (userId, match) => {
  return match.team1.find(player => player.id === userId) ? match.team2 : match.team1
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

export const computeDays = matchChanges => {
  let worstDayKey = ''
  let bestDayKey = ''
  let daysMap = {}
  for (let match of matchChanges) {
    const key = match.date.toLocaleDateString()
    const value = Number(match.ratingChangeString)
    if (!daysMap.hasOwnProperty(key)) {
      daysMap[key] = {
        date: key,
        value,
      }
    } else {
      daysMap[key]['value'] += value
    }

    bestDayKey = updateMaxFromMap(daysMap[bestDayKey] ?? {}, 'value', daysMap[key]).date
    worstDayKey = updateMinFromMap(daysMap[worstDayKey] ?? {}, 'value', daysMap[key]).date
  }

  return {
    bestDay: daysMap[bestDayKey],
    worstDay: daysMap[worstDayKey],
  }
}

export const computeTeammates = (userId, userMatches) => {
  const teammates = findSignificantUsers(userId, userMatches, getTeamMates)
  return {
    mostFrequentTeammate: teammates.mostFrequentUser,
    leastFrequentTeammate: teammates.leastFrequentUser,
    mostSuccessTeammate: teammates.mostSuccessUser,
    leastSuccessTeammate: teammates.leastSuccessUser,
  }
}

export const computeOpponents = (userId, userMatches) => {
  const opponents = findSignificantUsers(userId, userMatches, getOpponents)
  return {
    mostFrequentOpponent: opponents.mostFrequentUser,
    leastFrequentOpponent: opponents.leastFrequentUser,
    mostSuccessOpponent: opponents.mostSuccessUser,
    leastSuccessOpponent: opponents.leastSuccessUser,
  }
}

const findSignificantUsers = (userId, userMatches, usersProvider) => {
  let mostFrequentUser = {}
  let leastFrequentUser = {}
  let mostSuccessUser = {}
  let leastSuccessUser = {}
  let usersMap = {}
  for (let match of userMatches) {
    const users = usersProvider(userId, match)
    for (let user of users) {
      if (!usersMap.hasOwnProperty(user.id)) {
        usersMap[user.id] = {
          user: user,
          matches: 1,
          wins: Number(didUserWin(userId, match)),
          winRatio: Number(didUserWin(userId, match)),
        }
      } else {
        ++usersMap[user.id]['matches']
        usersMap[user.id]['wins'] += Number(didUserWin(userId, match))
        usersMap[user.id]['losses'] = usersMap[user.id]['matches'] - usersMap[user.id]['wins']
      }

      mostFrequentUser = updateMaxFromMap(mostFrequentUser, 'matches', usersMap[user.id])
      leastFrequentUser = updateMinFromMap(leastFrequentUser, 'matches', usersMap[user.id])
      mostSuccessUser = updateMaxFromMap(mostSuccessUser, 'wins', usersMap[user.id])
      leastSuccessUser = updateMaxFromMap(leastSuccessUser, 'losses', usersMap[user.id])
    }
  }

  return {
    mostFrequentUser,
    leastFrequentUser,
    mostSuccessUser,
    leastSuccessUser,
  }
}

const updateMinFromMap = (target, targetKey, source) => {
  if (!target.hasOwnProperty(targetKey) 
  || target[targetKey] >= source[targetKey]) {
    return { ...source }
  }
  return target
}

const updateMaxFromMap = (target, targetKey, source) => {
  if (!target.hasOwnProperty(targetKey) 
  || target[targetKey] < source[targetKey]) {
    return { ...source }
  }
  return target
}
