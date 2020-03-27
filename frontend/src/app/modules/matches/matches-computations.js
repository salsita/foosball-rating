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

export const computeDays = matchChanges => {
  let worstDayKey = ''
  let bestDayKey = ''
  const daysMap = {}
  for (const match of matchChanges) {
    const key = match.date.toLocaleDateString()
    const value = Number(match.ratingChangeString)
    if (!Object.hasOwnProperty.call(daysMap, key)) {
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

export const computeTeammates = (playerId, playerMatches) => {
  const teammates = findSignificanPlayers(playerId, playerMatches, getTeamMates)
  return {
    mostFrequentTeammate: teammates.mostFrequentPlayer,
    leastFrequentTeammate: teammates.leastFrequentPlayer,
    mostSuccessTeammate: teammates.mostSuccessPlayer,
    leastSuccessTeammate: teammates.leastSuccessPlayer,
  }
}

export const computeOpponents = (playerId, playerMatches) => {
  const opponents = findSignificanPlayers(playerId, playerMatches, getOpponents)
  return {
    mostFrequentOpponent: opponents.mostFrequentPlayer,
    leastFrequentOpponent: opponents.leastFrequentPlayer,
    mostSuccessOpponent: opponents.mostSuccessPlayer,
    leastSuccessOpponent: opponents.leastSuccessPlayer,
  }
}

const findSignificanPlayers = (playerId, playerMatches, playersProvider) => {
  let mostFrequentPlayer = {}
  let leastFrequentPlayer = {}
  let mostSuccessPlayer = {}
  let leastSuccessPlayer = {}
  const playersMap = {}
  for (const match of playerMatches) {
    const players = playersProvider(playerId, match)
    for (const player of players) {
      if (!Object.hasOwnProperty.call(playersMap, player.id)) {
        playersMap[player.id] = {
          player: player,
          matches: 1,
          wins: Number(didPlayerWin(playerId, match)),
          winRatio: Number(didPlayerWin(playerId, match)),
        }
      } else {
        ++playersMap[player.id]['matches']
        playersMap[player.id]['wins'] += Number(didPlayerWin(playerId, match))
        playersMap[player.id]['losses'] = playersMap[player.id]['matches'] - playersMap[player.id]['wins']
      }

      mostFrequentPlayer = updateMaxFromMap(mostFrequentPlayer, 'matches', playersMap[player.id])
      leastFrequentPlayer = updateMinFromMap(leastFrequentPlayer, 'matches', playersMap[player.id])
      mostSuccessPlayer = updateMaxFromMap(mostSuccessPlayer, 'wins', playersMap[player.id])
      leastSuccessPlayer = updateMaxFromMap(leastSuccessPlayer, 'losses', playersMap[player.id])
    }
  }

  return {
    mostFrequentPlayer,
    leastFrequentPlayer,
    mostSuccessPlayer,
    leastSuccessPlayer,
  }
}

const updateMinFromMap = (target, targetKey, source) => {
  if (!Object.hasOwnProperty.call(target, targetKey) ||
    target[targetKey] >= source[targetKey]
  ) {
    return { ...source }
  }
  return target
}

const updateMaxFromMap = (target, targetKey, source) => {
  if (!Object.hasOwnProperty.call(target, targetKey) ||
    target[targetKey] < source[targetKey]
  ) {
    return { ...source }
  }
  return target
}
