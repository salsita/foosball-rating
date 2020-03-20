import React from 'react'
import { connect } from 'react-redux'
import { isGameSelected } from '../modules/games/games-selectors'

const mapStateToProps = state => ({
  condition: isGameSelected(state),
})

function ShowIfElse(props) {
  const { condition, children } = props
  return <>
    { condition? children[0] : children[1]? children[1]: null}
  </>
}

export const ShowIfGameIsSelected = connect(mapStateToProps)(ShowIfElse)
