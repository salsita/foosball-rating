import styled from 'styled-components';

const Logo = styled.a`
  img {
    width: auto;
    height: 50px;
    position: absolute;
    left: 10px;

    @media (max-width: 320px) {
      height: 30px;
      margin: 10px 0;
    }
  }
`

export default Logo;
