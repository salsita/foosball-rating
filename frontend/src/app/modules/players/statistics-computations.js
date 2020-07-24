import { DEFAULT_DAYS_STATISTICS, DEFAULT_PLAYERS_STATISTICS } from '../../const/constants'
import {
  didPlayerWin,
  computeLongestWinStreak,
  generateMatchRatingChanges,
} from '../matches/matches-computations'

const getTeamMates = (playerId, { team1, team2 }) => {
  const playerTeam = team1.find(player => player.id === playerId) ? team1 : team2
  return playerTeam.filter(player => player.id !== playerId)
}

const getOpponents = (playerId, { team1, team2 }) =>
  team1.find(player => player.id === playerId) ? team2 : team1

const findWithComparator = (comparator, arr, getField, baseScore) =>
  arr.reduce((acc, node) =>
    comparator(acc.score, getField(node))
      ? acc
      : { value: node.value, score: getField(node) }
  , { score: baseScore })

const findMin = (arr, getField = node => node.score) =>
  findWithComparator((e1, e2) => e1 <= e2, arr, getField, Infinity)

const findMax = (arr, getField = node => node.score) =>
  findWithComparator((e1, e2) => e1 >= e2, arr, getField, -Infinity)

const computeWins = (playerId, playerMatches) =>
  playerMatches.filter(match => didPlayerWin(playerId, match)).length

const computeDays = matchChanges => {
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

const computeTeammateStats = (playerId, playerMatches) =>
  computePlayerStats(playerId, playerMatches, getTeamMates) || {}

const computeOpponentsStats = (playerId, playerMatches) =>
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

export const computeWinRatio = (playerId, playerMatches) => {
  const wonMatchesCount = playerMatches.filter(match => didPlayerWin(playerId, match)).length
  return (playerMatches.length > 0) ? (wonMatchesCount / playerMatches.length) : 0
}

export const generateStatisticsForPlayer = (playerMatches, playerId) => {
  const matchChanges = generateMatchRatingChanges(playerId, playerMatches)
  const days = computeDays(matchChanges)
  const teammateStats = computeTeammateStats(playerId, playerMatches)
  const opponentStats = computeOpponentsStats(playerId, playerMatches)

  return {
    matchChanges,
    longestStreak: computeLongestWinStreak(playerId, playerMatches),
    winRatio: computeWinRatio(playerId, playerMatches),
    totalMatches: playerMatches.length,
    wins: computeWins(playerId, playerMatches),
    bestDay: findMax(days),
    worstDay: findMin(days),

    mostFrequentTeammate: findMax(teammateStats, teammate => teammate.matches),
    leastFrequentTeammate: findMin(teammateStats, teammate => teammate.matches),
    mostSuccessTeammate: findMax(teammateStats, teammate => teammate.wins),
    leastSuccessTeammate: findMax(teammateStats, teammate => teammate.losses),

    mostFrequentOpponent: findMax(opponentStats, opponent => opponent.matches),
    leastFrequentOpponent: findMin(opponentStats, opponent => opponent.matches),
    mostSuccessOpponent: findMax(opponentStats, opponent => opponent.wins),
    leastSuccessOpponent: findMax(opponentStats, opponent => opponent.losses),
  }
}
