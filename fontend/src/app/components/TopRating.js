import React, { Component } from 'react';

// components pure html
import {
  Title, Subtitle, TextSpan,
  ListCon, ListItem,
  ALink,
  GridContainer
} from './../../styles/blocks/';

class TopRating extends Component {
  render() {
    return(

      <ListCon>

        {/* One Item of list */}
        <ListItem>
          <TextSpan textAlign="right">
            <ALink>Jack</ALink> +1800
          </TextSpan>
        </ListItem>
        <ListItem>
          <TextSpan textAlign="right">
            <ALink>Jack</ALink> +1800
          </TextSpan>
        </ListItem>
        <ListItem>
          <TextSpan textAlign="right">
            <ALink>Jack</ALink> +1800
          </TextSpan>
        </ListItem>
      
      </ListCon>
      
    )
  }
}

export default TopRating;