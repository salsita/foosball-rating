import React, { Component } from 'react';
import { connect } from "react-redux"

import { ListCon } from '../../../styles/blocks';
import TopRatingRow from './TopRatingRow';

import { getTopUsers } from '../../modules/users/users-selectors'

class TopRating extends Component {
  render() {

    return(
      <ListCon className="topPlayers">
      {this.props.topUsers.map(data => 
        <TopRatingRow data={data} />
      )}
      </ListCon>
    )
  }
}

const mapStateToProps = state => ({
  topUsers: getTopUsers(state)
})

const SmartTopRating = connect(mapStateToProps)(TopRating)

export default SmartTopRating
