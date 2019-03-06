import React, { Component } from 'react';

import Header from './components/header';
import {Container} from './../styles/blocks/layout';
// pages 
import Dashboard from './pages/Dashboard';


class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Dashboard />
      </Container>
    );
  }
}

export default App;
