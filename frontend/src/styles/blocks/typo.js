import styled from 'styled-components';
import variables from './../variables';

const Title = styled.h1`
  font-size: ${variables.fontSizeTitle};
  text-align: ${props => props.textAlign};
  margin: 0;
`
const Subtitle = styled.h2`
  font-size: ${variables.fontSizeSubtitle};
  text-align: ${props => props.textAlign};
`
const TextSpan = styled.span`
  text-align: ${props => props.textAlign};
  font-weight: 600;
`
const WinnerSpan = styled.span`
  text-align: ${props => props.textAlign};
  color: ${({ winner }) => winner ? "green" : "red"};
  font-weight: 600;
`

export {Title, Subtitle, TextSpan, WinnerSpan};
