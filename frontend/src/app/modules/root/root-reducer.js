import { createReducer } from 'reduxsauce'

import { MatchesActions } from '../matches/matches-actions'
import { PlayersActions } from '../players/players-actions'
import { ready, StatusType } from '../api/request-status'
import { RootActions } from './root-actions'
import { AlertType, UserAlert } from './user-alert'
import { DASHBOARD } from '../../const/routes'
import { ThemeActions } from '../theme/theme-actions'
import { LeaderboardActions } from '../leaderboard/leaderboard-actions'
import { ThemeTypes } from '../../const/theme-types'
import { StorageThemeKey } from '../../const/constants'
import * as Filters from '../../const/leaderboard-filters'
import { GamesActions } from '../games/games-actions'
import { getSelectedGamePath } from '../games/games-selectors'

const initialState = {
  matchesStatus: ready,
  matches: [],
  playersStatus: ready,
  players: [],
  games: [],
  selectedGame: null,
  gameNotFound: false,
  activeAlert: null,
  activeRedirect: null,
  theme: window.localStorage.getItem(StorageThemeKey) || ThemeTypes.Dark,
  themeTransition: false,
  filters: {
    criteria: Filters.criteriaTypes.Elo,
    order: Filters.orderTypes.DESC,
    timespan: Filters.timespanTypes.AllTime,
  },
}

const playersLoaded = (state, { players }) => ({
  ...state,
  players,
})

const updatePlayersStatus = (state, { status }) => ({
  ...state,
  playersStatus: status,
  activeAlert: createAlertForPlayerStatusUpdate(status) || state.activeAlert,
})

const matchesLoaded = (state, { matches }) => ({
  ...state,
  matches,
})

const updateMatchesStatus = (state, { status }) => ({
  ...state,
  matchesStatus: status,
  activeAlert: createAlertForMatchesStatusUpdate(status) || state.activeAlert,
  activeRedirect: createRedirectForMatchesStatusUpdate(getSelectedGamePath(state), status) ||
    state.activeRedirect,
})

const gamesLoaded = (state, { games }) => ({
  ...state,
  games,
})

const selectGame = (state, { selectedGame }) => ({
  ...state,
  selectedGame,
  gameNotFound: false,
})

const deselectGame = state => ({
  ...state,
  selectedGame: null,
  gameNotFound: false,
})

const setGameNotFound = state => ({
  ...state,
  gameNotFound: true,
})

const createRedirectForMatchesStatusUpdate = (parentPath, status) => {
  if (status.type === StatusType.SUCCESS) {
    return `${parentPath}${DASHBOARD}`
  }
  return null
}

const createAlertForPlayerStatusUpdate = status => {
  switch (status.type) {
    case StatusType.SUCCESS:
      return new UserAlert('Successfully added!', AlertType.SUCCESS)
    case StatusType.FAILURE:
      return new UserAlert(`Failed to add player :( - ${status.error}`, AlertType.ERROR)
  }

  return null
}

const createAlertForMatchesStatusUpdate = status => {
  switch (status.type) {
    case StatusType.SUCCESS:
      return new UserAlert('Succesfully created!', AlertType.SUCCESS)
    case StatusType.FAILURE:
      return new UserAlert(`Failed to create match :( - ${status.error}`, AlertType.ERROR)
  }

  return null
}

const dismissRedirect = state => ({
  ...state,
  activeRedirect: null,
})

const dismissAlert = state => {
  if (!state.activeAlert) {
    return state
  }

  const dismissedAlert = state.activeAlert.asDismissed()

  return {
    ...state,
    activeAlert: dismissedAlert,
  }
}

const themeChanged = (state, { newTheme }) => ({
  ...state,
  theme: newTheme,
  themeTransition: true,
})

const stopThemeTransition = state => ({
  ...state,
  themeTransition: false,
})

const updateCriteria = (state, { criteria }) => ({
  ...state,
  filters: {
    ...state.filters,
    criteria,
  },
})

const updateOrder = (state, { order }) => ({
  ...state,
  filters: {
    ...state.filters,
    order,
  },
})

const updateTimespan = (state, { timespan }) => ({
  ...state,
  filters: {
    ...state.filters,
    timespan,
  },
})

export const rootReducer = createReducer(initialState, {
  [PlayersActions.Types.PLAYERS_LOADED]: playersLoaded,
  [PlayersActions.Types.UPDATE_STATUS]: updatePlayersStatus,
  [MatchesActions.Types.MATCHES_LOADED]: matchesLoaded,
  [MatchesActions.Types.UPDATE_STATUS]: updateMatchesStatus,
  [GamesActions.Types.GAMES_LOADED]: gamesLoaded,
  [GamesActions.Types.SELECT_GAME]: selectGame,
  [GamesActions.Types.DESELECT_GAME]: deselectGame,
  [GamesActions.Types.NOT_FOUND_GAME]: setGameNotFound,
  [RootActions.Types.DISMISS_ALERT]: dismissAlert,
  [RootActions.Types.DISMISS_REDIRECT]: dismissRedirect,
  [ThemeActions.Types.THEME_CHANGED]: themeChanged,
  [ThemeActions.Types.STOP_THEME_TRANSITION]: stopThemeTransition,
  [LeaderboardActions.Types.UPDATE_CRITERIA]: updateCriteria,
  [LeaderboardActions.Types.UPDATE_ORDER]: updateOrder,
  [LeaderboardActions.Types.UPDATE_TIMESPAN]: updateTimespan,
})
