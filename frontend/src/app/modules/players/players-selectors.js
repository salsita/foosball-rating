import { createSelector } from 'reselect'

import { getLastMatches, getLastMatchesForPlayer } from '../matches/matches-selectors'
import { generateStatisticsForPlayer } from './statistics-computations'
import { sortTopPlayers, getRatingStatisticsForPlayer, computeKingStreakDuration } from './players-computations'
import { plotRatingHistory } from '../matches/matches-computations'

export const getPlayers = state => state.players
const getMatches = state => state.matches
const getFilters = state => state.filters

export const getPlayer = createSelector(
  getPlayers,
  (stats, playerId) => playerId,
  (players, playerId) => players.find(player => player.id === playerId),
)

export const getTopRatedPlayers = createSelector(
  getPlayers,
  players => players.sort((player1, player2) => player2.rating - player1.rating),
)

export const getKing = createSelector(
  getLastMatches,
  getTopRatedPlayers,
  computeKingStreakDuration,
)

export const getTopPlayers = createSelector(
  getPlayers,
  getMatches,
  getFilters,
  sortTopPlayers,
)

export const getRankingsForPlayer = createSelector(
  state => getTopRatedPlayers(state),
  (state, playerId) => playerId,
  getRatingStatisticsForPlayer,
)

export const getStatisticsForPlayer = createSelector(
  getLastMatchesForPlayer,
  (state, playerId) => playerId,
  generateStatisticsForPlayer,
)

export const getRatingHistoryGraphForPlayer = createSelector(
  getLastMatchesForPlayer,
  getPlayer,
  (playerMatches, player) => plotRatingHistory(playerMatches, player.id, player.initialRating),
)
