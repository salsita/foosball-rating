import React, { Component } from 'react';
import { 
  Title,
  Subtitle,
  GridContainer, Box,
  Button,
} from './../../../styles/blocks';
import SelectInput from './../../components/SelectInput';

const players = [
  {
    name: 'jack'
  },{
    name: 'john'
  },{
    name: 'patrick'
  },{
    name: 'tom'
  },{
    name: 'pavel'
  },{
    name: 'Olaf'
  },
]

class CreateMatch extends Component {
  render() {
    return(
      <>
        <Title>Match</Title>
        <GridContainer Column="1fr 1fr">
          <Box Margin="0 10px">
            <Subtitle>Team 1</Subtitle>

            <SelectInput data={players} />
            <SelectInput data={players} />
            
            <Button>Team 1 Win</Button>
          </Box>
          <Box Margin="0 10px">
            <Subtitle>Team 2</Subtitle>

            <SelectInput data={players} />
            <SelectInput data={players} />
            
            <Button>Team 2 Win</Button>
          </Box>
        </GridContainer>
      </>
    )
  }
}

export default CreateMatch;
