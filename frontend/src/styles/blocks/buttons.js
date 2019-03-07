import styled from 'styled-components';
import variables from './../variables';

const Button = styled.button`
  border: 1px solid;
  border-color: ${variables.cBorder};
  padding: 5px 10px;
  border-radius: 8px;
  width: 100%;

  @media (min-width: ${variables.bpMedium}) {
    width: 300px;
    margin: 0 auto;
  }
`

export default Button;
