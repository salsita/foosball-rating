import React, { Component } from 'react';
import { ListCon } from '../../../styles/blocks';
import TopRatingRow from './TopRatingRow';

class TopRating extends Component {
  render() {

    const TopRatings = [
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

    return(

      <ListCon>

      {TopRatings.map((data) => 
        <TopRatingRow data={data} />
      )}

      </ListCon>
      
    )
  }
}

export default TopRating;
