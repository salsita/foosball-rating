import * as Filters from '../../const/leaderboard-filters'

import { computeWinRatio } from './statistics-computations'
import { didPlayerPlayMatch, computeLongestWinStreak } from '../matches/matches-computations'

const getPlayerCriteriaPoints = (player, matchesLast, criteria) => {
  const playerId = Number(player.id)
  const playerMatches = matchesLast.filter(match => didPlayerPlayMatch(playerId, match))
  const winRatio = computeWinRatio(playerId, playerMatches)
  switch (criteria) {
    case Filters.criteriaTypes.Wins:
      return Math.round(playerMatches.length * winRatio)
    case Filters.criteriaTypes.Ratio:
      return (winRatio * 100).toFixed(2)
    case Filters.criteriaTypes.Streak:
      return computeLongestWinStreak(playerId, playerMatches)
    case Filters.criteriaTypes.Matches:
      return playerMatches.length
    default:
      return player.rating
  }
}

export const sortTopPlayers = (players, matches, filters) => {
  const order = filters.order === Filters.orderTypes.ASC ? -1 : 1
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - filters.timespan)
  const matchesLast = matches
    .filter(match => filters.timespan === Filters.timespanTypes.AllTime || match.date > minDate)
    .sort((match1, match2) => match2.date - match1.date)

  const playersWithStatistics = players.map(player => ({
    ...player,
    criteriaPoints: getPlayerCriteriaPoints(player, matchesLast, filters.criteria),
  }))

  return playersWithStatistics.sort((u1, u2) => (u2.criteriaPoints - u1.criteriaPoints) * order)
}

export const getRatingStatisticsForPlayer = (players, playerId) => {
  const index = players.findIndex(player => player.id === playerId)
  return {
    ranking: index + 1,
    scoreToNextRank: index > 0
      ? 1 + (players[index - 1].rating - players[index].rating)
      : 0,
    scoreToPrevRank: index < players.length - 1
      ? 1 + (players[index].rating - players[index + 1].rating)
      : 0,
  }
}

/*
  First, we create a hash table of players and their current scores
  Then we iterate through matches from the latest, recompute scores of affected players and compare
  More preciselly:
    1. Recompute king's score in case he played the match, note whether he won the match
    2. Recompute scores of all (other) players in the match and test if any of them tops king
    3. Otherwise, compare his new score with scores of all other players,
    in case the king played the match and won (thus had smaller score before).
*/
export const computeKingStreakDuration = (lastMatches, lastPlayers) => {
  if (lastPlayers.length < 1) {
    return null
  }

  const playersMap = lastPlayers.reduce((map, player) => {
    map[player.id] = player.rating
    return map
  }, new Map())

  const kingId = lastPlayers[0].id
  let matchFound = false
  for (const match of lastMatches) {
    const players = [...match.team1, ...match.team2]

    const kingPlayer = players.find(player => player.id === kingId)
    let kingWon = false
    if (kingPlayer) {
      kingWon = playersMap[kingId] > kingPlayer.matchRating
      playersMap[kingId] = kingPlayer.matchRating
    }

    for (const player of players) {
      playersMap[player.id] = player.matchRating
      matchFound |= (player.id !== kingId && player.matchRating > playersMap[kingId])
    }

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
  return lastMatches[lastMatches.length - 1]
}
