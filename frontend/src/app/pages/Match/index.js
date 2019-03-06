import React, { Component } from 'react';

import { 
  Title,
  Subtitle,
  GridContainer,
  Btn,
  SelectBox, SelectLabel
} from './../../../styles/blocks';


class Match extends Component {
  render() {
    return(
      <>
        <Title>Match</Title>
        <GridContainer Column="1fr 1fr">
          <div>
            <Subtitle>Team 1</Subtitle>

            <SelectBox>
              <option value=""> -- Chose Team Member -- </option>
              <option value="Tom">Tom</option>
              <option value="Jack">Jack</option>
              <option value="Peter">Peter</option>
              <option value="Nick">Nick</option>
            </SelectBox>

            <SelectBox>
              <option value=""> -- Chose Team Member -- </option>
              <option value="Tom">Tom</option>
              <option value="Jack">Jack</option>
              <option value="Peter">Peter</option>
              <option value="Nick">Nick</option>
            </SelectBox>

            <Btn>Team 1 Win</Btn>
          </div>
          <div>
            <Subtitle>Team 2</Subtitle>

            <SelectBox>
              <option value=""> -- Chose Team Member -- </option>
              <option value="Tom">Tom</option>
              <option value="Jack">Jack</option>
              <option value="Peter">Peter</option>
              <option value="Nick">Nick</option>
            </SelectBox>

            <SelectBox>
              <option value=""> -- Chose Team Member -- </option>
              <option value="Tom">Tom</option>
              <option value="Jack">Jack</option>
              <option value="Peter">Peter</option>
              <option value="Nick">Nick</option>
            </SelectBox>

            <Btn>Team 2 Win</Btn>
          </div>
        </GridContainer>
      </>
    )
  }
}

export default Match;