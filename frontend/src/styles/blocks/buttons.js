import styled from 'styled-components'
import { variables } from './../variables'

export const SimpleButton = styled.button`
  border: none;
  border-radius: 8px;
  color: var(--cFont);

  &:hover {
    cursor: pointer;
  }
`

export const Button = styled(SimpleButton)`
  background: var(--cYellow);
  padding: 15px 20px;
  width: 100%;
  @media (min-width: ${variables.bpMedium}) {
    width: 300px;
  }
`
