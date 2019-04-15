import styled from 'styled-components';
import variables from './../variables';

const Logo = styled.a`
  position: absolute;
  left: 0;

  img {
    width: auto;
    height: 50px;
    position: absolute;
    left: 10px;

    @media (max-width: ${variables.bpMedium}) {
      width: 100px;
      height: auto;
      margin: 5px 0;
    }
  }
`

export default Logo;
