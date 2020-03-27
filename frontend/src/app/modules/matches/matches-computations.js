import { DEFAULT_DAYS_STATISTICS, DEFAULT_PLAYERS_STATISTICS } from '../../const/constants'

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

const findWithComparator = (comparator, arr, getField, baseScore) =>
  arr.reduce((acc, node) =>
    comparator(acc.score, getField(node))
      ? acc
      : { value: node.value, score: getField(node) }
  , { score: baseScore })

export const findMin = (arr, getField = node => node.score) =>
  findWithComparator((e1, e2) => e1 <= e2, arr, getField, Infinity)

export const findMax = (arr, getField = node => node.score) =>
  findWithComparator((e1, e2) => e1 >= e2, arr, getField, -Infinity)

export const computeDays = matchChanges => {
  const daysMap = new Map()

  for (const match of matchChanges) {
    const day = match.date.toLocaleDateString()
    const score = Number(match.ratingChangeString)
    daysMap.set(day, daysMap.has(day)
      ? {
        ...daysMap.get(day),
        score: daysMap.get(day).score + score,
      }
      : {
        value: day,
        score,
      })
  }
  return matchChanges.length
    ? Array.from(daysMap.values())
    : DEFAULT_DAYS_STATISTICS
}

export const computeTeammateStats = (playerId, playerMatches) =>
  computePlayerStats(playerId, playerMatches, getTeamMates) || {}

export const computeOpponentsStats = (playerId, playerMatches) =>
  computePlayerStats(playerId, playerMatches, getOpponents) || {}

const computePlayerStats = (playerId, playerMatches, playersProvider) => {
  const playersMap = new Map()

  for (const match of playerMatches) {
    const players = playersProvider(playerId, match)
    players.forEach(player =>
      playersMap.set(player.id, playersMap.has(player.id)
        ? {
          ...playersMap.get(player.id),
          matches: playersMap.get(player.id)['matches'] + 1,
          wins: playersMap.get(player.id)['wins'] += Number(didPlayerWin(playerId, match)),
          losses: playersMap.get(player.id)['losses'] += Number(!didPlayerWin(playerId, match)),
        }
        : {
          value: player,
          matches: 1,
          wins: Number(didPlayerWin(playerId, match)),
          losses: Number(!didPlayerWin(playerId, match)),
        }))
  }
  return playerMatches.length
    ? Array.from(playersMap.values())
    : DEFAULT_PLAYERS_STATISTICS
}

export const computeKingStreakDuration = (matchesLast, playersLast) => {
  if (playersLast.length < 1) {
    return null
  }

  const playersMap = playersLast.reduce((map, player) => {
    map[player.id] = player.rating
    return map
  }, new Map())

  const kingId = playersLast[0].id
  let matchFound = false
  for (const match of matchesLast) {
    const players = [...match.team1, ...match.team2]

    // #1 recomptute king's rating before in case he played the match
    const kingPlayer = players.find(player => player.id === kingId)
    let kingWon = false
    if (kingPlayer) {
      kingWon = playersMap[kingId] > kingPlayer.matchRating
      playersMap[kingId] = kingPlayer.matchRating
    }

    // #2 check whether none of the other players beat the king
    for (const player of players) {
      playersMap[player.id] = player.matchRating
      matchFound |= (player.id !== kingId && player.matchRating > playersMap[kingId])
    }

    // #3 check if king was first before winning
    if (kingPlayer && kingWon && !matchFound) {
      for (const key in playersMap) {
        matchFound |= (playersMap[key] > playersMap[kingId])
      }
    }

    if (matchFound) {
      return {
        id: kingId,
        since: match.date,
      }
    }
  }
  return matchesLast[matchesLast.length - 1]
}
