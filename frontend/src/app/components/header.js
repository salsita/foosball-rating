import React, { Component } from 'react';
import {
  Title, Subtitle,
  Logo,
  Nav
} from './../../styles/blocks/';

const logo = require('./../../media/logo.png');

class Header extends Component {
  render() {
    return(
      <Nav>
        <Logo href="https://www.salsitasoft.com/"><img src={logo} /></Logo>
      </Nav>
    )
  }
}

export default Header;
