import React, { Component } from 'react';
import { ListCon } from '../../../styles/blocks';
import TopRatingRow from './TopRatingRow';

const topRatings = [
  {
    name: 'Jack',
    rating: '1800',
  },{
    name: 'Jack',
    rating: '1700',
  },{
    name: 'Jack',
    rating: '1600',
  },{
    name: 'Jack',
    rating: '1500',
  },{
    name: 'Jack',
    rating: '1400',
  },
]

class TopRating extends Component {
  render() {
    return(
      <ListCon className="topPlayers">
        {topRatings.map((data) => 
            <TopRatingRow data={data} />
        )}
      </ListCon>
    )
  }
}

export default TopRating;
