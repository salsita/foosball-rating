import { ThemeTypes } from '../../const/theme-types'
import { StorageThemeKey } from '../../const/constants'

export const changeTheme = currentTheme => {
  const newTheme = currentTheme === ThemeTypes.Dark ? ThemeTypes.Light : ThemeTypes.Dark
  window.localStorage.setItem(StorageThemeKey, newTheme)

  return newTheme
}
