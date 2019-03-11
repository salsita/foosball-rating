import React, { Component } from 'react';
import { CreateMatch } from '../../components/CreateMatch/CreateMatch';

export class CreateMatchPage extends Component {
  render = () => <CreateMatch maxPlayerNumber={2} minPlayerNumber={1} />
}
