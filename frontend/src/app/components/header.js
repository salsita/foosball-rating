import React, { Component } from 'react';
import {
  Title, Subtitle,
  Logo
} from './../../styles/blocks/';

const logo = require('./../../media/logo.png');

class Header extends Component {
  render() {
    return(
      <div>
        <Logo href="https://www.salsitasoft.com/"><img src={logo} /></Logo>
      </div>
    )
  }
}

export default Header;
