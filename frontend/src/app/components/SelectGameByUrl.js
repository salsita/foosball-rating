import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { GamesActions } from '../modules/games/games-actions'
import { isGameSelected, selectGames } from '../modules/games/games-selectors'

class SelectGameByUrlComponent extends React.Component {
  render() {
    return null
  }

  componentDidMount() {
    if (this.props.games.length) {
      this.props.selectGameByName(this.props.match.params.gameName)
    }
  }

  componentDidUpdate() {
    if (this.props.games.length) {
      this.props.selectGameByName(this.props.match.params.gameName)
    }
  }
}

const mapStateToProps = state => ({
  isGameSelected: isGameSelected(state),
  games: selectGames(state),
})

const mapDispatchToProps = dispatch => ({
  selectGameByName: gameName => {
    dispatch(GamesActions.Creators.selectGameByName(gameName))
  },
})

export const SelectGameByUrl =
connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectGameByUrlComponent))
