import React, { Component } from 'react';

// components pure html
import {
  Title, Subtitle, TextSpan,
  ListCon, ListItem,
  ALink,
  GridContainer
} from './../../styles/blocks/';

class BattleHistory extends Component {
  render() {
    return(

      <ListCon>

        {/* One Item of list */}
        <ListItem Display="grid" Column="2fr 1fr 2fr">
          <TextSpan textAlign="right">
            <ALink>Jhon</ALink>
            & 
            <ALink>Jack</ALink>
          </TextSpan>
          <TextSpan textAlign="center">VS</TextSpan>
          <TextSpan textAlign="left">
            <ALink>Tom</ALink>
            & 
            <ALink>Nick</ALink>
          </TextSpan>
        </ListItem>

        <ListItem Display="grid" Column="2fr 1fr 2fr">
          <TextSpan textAlign="right">
            <ALink>Jhon</ALink>
            & 
            <ALink>Jack</ALink>
          </TextSpan>
          <TextSpan textAlign="center">VS</TextSpan>
          <TextSpan textAlign="left">
            <ALink>Tom</ALink>
            & 
            <ALink>Nick</ALink>
          </TextSpan>
        </ListItem>


      </ListCon>
      
    )
  }
}

export default BattleHistory;