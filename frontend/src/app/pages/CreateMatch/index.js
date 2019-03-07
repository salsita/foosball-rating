import React, { Component } from 'react';
import { 
  Title,
  Subtitle,
  GridContainer,
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
          <div>
            <Subtitle>Team 1</Subtitle>

            <SelectInput data={players} />
            <SelectInput data={players} />
            
            <Button>Team 1 Win</Button>
          </div>
          <div>
            <Subtitle>Team 2</Subtitle>

            <SelectInput data={players} />
            <SelectInput data={players} />
            
            <Button>Team 2 Win</Button>
          </div>
        </GridContainer>
      </>
    )
  }
}

export default CreateMatch;
