import React, { Component } from 'react';
import { SmartCreateMatchForm } from '../../components/CreateMatch/CreateMatchForm';

class CreateMatch extends Component {
  render = () => <SmartCreateMatchForm maxPlayerNumber={2} minPlayerNumber={1} />
}

export default CreateMatch;
