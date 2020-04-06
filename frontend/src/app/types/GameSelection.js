import { SelectionStatus } from '../const/games'

export const createGameSelection = game => {
  return { status: SelectionStatus.SELECTED, value: game }
}

export const createEmptySelection = () => {
  return { status: SelectionStatus.NOT_SELECTED }
}

export const createFailedSelection = gameName => {
  return { status: SelectionStatus.FAILED, gameName }
}
