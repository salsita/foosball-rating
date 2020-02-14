import { ThemeTypes } from '../../const/theme-types'

export const changeTheme = theme => {
  const newTheme = theme === ThemeTypes.Dark ? ThemeTypes.Light : ThemeTypes.Dark
  window.localStorage.setItem('theme', newTheme)

  return {
    theme: newTheme,
    themeTransition: 1,
  }
}
