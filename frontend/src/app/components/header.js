import React, { Component } from 'react';
import {
  Title,
  Logo,
  Nav,
  StyledLink
} from './../../styles/blocks/';
import { DASHBOARD } from '../const/routes';

const logo = require('./../../media/logo.png');

class Header extends Component {
  render() {
    return(
      <Nav>
        <Logo href="https://www.salsitasoft.com/"><img src={logo} /></Logo>
        <Title><StyledLink to={DASHBOARD}>Foosball Rating</StyledLink></Title>
      </Nav>
    )
  }
}

export default Header;
