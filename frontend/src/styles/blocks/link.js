import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SimpleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const StyledLink = styled(SimpleLink)`
  padding: 5px;

  span {
    font-size: 10px;
  }
`
