import styled from 'styled-components'
import variables from './../variables'

const Title = styled.h1`
  font-size: ${variables.fontSizeTitle};
  text-align: ${props => props.textAlign};
  margin: ${props => props.Margin};
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
  padding: 0 5px;
`
const WinnerSpan = styled.span`
  text-align: ${props => props.textAlign};
  color: ${({ winner }) => winner ? "var(--TeamsColorWin)" : "var(--TeamColorLoss)"};
  font-weight: 400;
  order: ${({ winner }) => winner ? '1' : '3'};
`

const BattleLabel = styled.span`
  order: 2;
`

const StyledHyperLink = styled.a`
  text-decoration: none;
  padding: 5px;
  color: var(--cFont);

  span {
    font-size: 10px;
  }
`

export { Title, Subtitle, TextSpan, WinnerSpan, BattleLabel, StyledHyperLink }
