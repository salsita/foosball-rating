import React from 'react'
import logoSmall from './../../media/logo-small.png'
import logo from './../../media/logo.png'
import { Link } from 'react-router-dom'

export const LogoComponent = ({ className }) => (
  <span className={className}>
    <Link id='smalllogo' to={'/'}>
      <img src={logoSmall} alt="logo" />
    </Link>
    <Link id='largelogo' to={'/'}>
      <img src={logo} alt="logo" />
    </Link>
  </span>
)
