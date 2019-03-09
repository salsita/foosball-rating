import styled from 'styled-components';
import variables from './../variables';

const Title = styled.h1`
  font-size: ${variables.fontSizeTitle};
  text-align: ${props => props.textAlign};
  margin: 0;
  font-weight: 400;
`
const Subtitle = styled.h2`
  font-size: ${variables.fontSizeSubtitle};
  text-align: ${props => props.textAlign};
  font-weight: 400;
`
const TextSpan = styled.span`
  text-align: ${props => props.textAlign};
  font-weight: 400;
`
const WinnerSpan = styled.span`
  text-align: ${props => props.textAlign};
  color: ${({ winner }) => winner ? "rgb(29, 125, 80)" : "#f44336"};
  font-weight: 400;
`

export {Title, Subtitle, TextSpan, WinnerSpan};
