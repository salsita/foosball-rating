import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './const/routes';

import Header from './components/header';
import {Container} from './../styles/blocks/layout';
// pages 
import Dashboard from './pages/Dashboard';


class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />

        </Container>
      </Router>
    );
  }
}

export default App;
