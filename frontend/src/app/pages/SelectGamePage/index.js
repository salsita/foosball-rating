import React from 'react'
import { SelectInput } from '../../components/SelectInput'
import { Subtitle } from '../../../styles/blocks'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { GamesActions } from '../../modules/games/games-actions'

class SelectGamePageComponent extends React.Component {
  render() {
    const { games, candidateGame, history } = this.props
    const gameItems = [ { value: 'none', label: 'none' }, ...games.map(game => ({ value: game.name, label: game.name })) ]
    return (
      <>
        <Subtitle>Select the game!</Subtitle>
        <SelectInput
          selectedValue={candidateGame && candidateGame} items={gameItems}
          onChange={event => {
            console.log(event.target.value)
            history.push(`/${event.target.value}`)
          }} />
      </>
    )
  }

  componentDidMount() {
    this.props.deselectGame()
  }

  componentDidUpdate() {
    this.props.deselectGame()
  }
}

const mapDispatchToProps = dispatch => ({
  deselectGame: () => {
    dispatch(GamesActions.Creators.deselectGame())
  },
})

const mapStateToProps = state => ({
  candidateGame: state.candidateGame,
  games: state.games,
})


export const SelectGamePage = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(SelectGamePageComponent))
