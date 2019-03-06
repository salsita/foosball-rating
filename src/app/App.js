import React, { Component } from 'react';

import Header from './components/header';
import {Container} from './../styles/blocks/layout';
// pages 
import HP from './pages/HP';


class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <HP />
      </Container>
    );
  }
}

export default App;
