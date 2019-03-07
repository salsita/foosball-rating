import React, { Component } from 'react';
import { 
  Title,
  Subtitle,
  GridContainer,
  Button,
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

            <Button>Team 1 Win</Button>
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

            <Button>Team 2 Win</Button>
          </div>
        </GridContainer>
      </>
    )
  }
}

export default Match;
