import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListCon } from '../../../styles/blocks'
import { TopRatingRow } from './TopRatingRow'

import { getTopUsers } from '../../modules/users/users-selectors'

class TopRatingComponent extends Component {
  render() {

    return (
      <ListCon className="topPlayers">
        {this.props.topUsers.slice(0, this.props.maxItems).map(user =>
          <TopRatingRow key={user.id} user={user} />,
        )}
      </ListCon>
    )
  }
}

const mapStateToProps = state => ({
  topUsers: getTopUsers(state),
})

export const TopRating = connect(mapStateToProps)(TopRatingComponent)
