import React from 'react'
import { Title } from '../../../styles/blocks'
import { connect } from 'react-redux'

const GameNotFoundComponent = ({ gameNotFound }) => {
  console.log(gameNotFound)
  return <Title>{ gameNotFound? 'Game is not found!' : 'Loading...' }</Title>
}

const mapStateToProps = state => ({
  gameNotFound: state.gameNotFound,
})

export const GameNotFoundPage = connect(mapStateToProps)(GameNotFoundComponent)
