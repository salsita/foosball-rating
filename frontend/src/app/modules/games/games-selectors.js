export const getSelectedGame = state => state.selectedGame

export const selectGames = state => state.games

export const isGameSelected = state => Boolean(state.selectedGame)

export const hasGames = state => Boolean(state.games.length)
