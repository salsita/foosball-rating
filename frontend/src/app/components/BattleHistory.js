import React, { Component } from 'react';

import {
  ListCon,
} from './../../styles/blocks/';

import BattleHistoryRow from './BattleHistoryRow';

class BattleHistory extends Component {
  constructor() {
    super();

    this.state = {
      matches: [
        {
          match: 1,
          team1:
            {
              name1: 'Jhon jedna jedna',
              name2: 'Jack jedna dva',
              status: 'win',
            },
          team2: 
            {
              name1: 'Patrick dva jedna',
              name2: 'Rob dva dva',
            }
          
        },
        {
          match: 2,
          team1:
            {
              name1: 'Jhon',
              name2: 'Jack',
            }
          ,
          team2: 
            {
              name1: 'Patrick',
              name2: 'Rob',
            }
          
        },
        {
          match: 3,
          team1: 
            {
              name1: 'Jhon',
              name2: 'Jack',
              status: 'win',
            }
          ,
          team2: 
            {
              name1: 'Patrick',
              name2: 'Rob',
            }
          
        }
      ]
    }
  }
  render() {

    return(
      <ListCon>

        {this.state.matches.map((match) => 
          
          <BattleHistoryRow  match={match}/>
        )}
        
      </ListCon>
      
    )
  }
}

export default BattleHistory;
