export const getSelectedGame = state => state.gameSelection.value

export const selectGames = state => state.games

export const hasGames = state => Boolean(state.games.length)
