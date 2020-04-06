import React from 'react'
import { SelectInput } from '../../components/SelectInput'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Subtitle } from '../../../styles/blocks'
import { Footer } from '../../components/Footer/footer'
import { Header } from '../../components/header'

export class SelectGamePageComponent extends React.Component {
  render() {
    const SELECT_GAME_LABEL = 'Select the game!'
    const { games, history } = this.props
    const gameItems = [
      { value: SELECT_GAME_LABEL, label: SELECT_GAME_LABEL },
      ...games.map(game => ({ value: game.name, label: game.name })),
    ]
    return (
      <>
        <Header/>
        <Container>
          <Subtitle>Games</Subtitle>
          <SelectInput
            items={gameItems}
            onChange={event => {
              const value = event.target.value
              if (value !== SELECT_GAME_LABEL) {
                history.push(`/${event.target.value}`)
              }
            }}/>
        </Container>
        <Footer/>
      </>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games,
})


export const SelectGamePage =
  withRouter(connect(mapStateToProps)(SelectGamePageComponent))
