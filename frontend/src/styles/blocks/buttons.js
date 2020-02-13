import styled from 'styled-components'
import variables from './../variables'

const Button = styled.button`
  background: var(--cYellow);
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  width: 100%;
  font-weight: 700;
  color: var(--cFont);
 
  @media (min-width: ${variables.bpMedium}) {
    width: 300px;
  }
`

export default Button
