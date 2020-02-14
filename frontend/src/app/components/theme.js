import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

const ThemeComponent = ({ theme, themeTransition, children }) => {
  const themeClass = classNames(
    theme, {
      'theme-transition': themeTransition,
    }
  )

  return (
    <div className={themeClass}>
      {children}
    </div>
  )
}

const mapStateToProps = state => ({
  theme: state.theme,
  themeTransition: state.themeTransition,
})

export const Theme = connect(mapStateToProps)(ThemeComponent)
