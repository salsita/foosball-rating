import styled from 'styled-components'
import { variables } from './../variables'

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
  float: ${props => props.align || 'none'};
  font-weight: 400;
  padding: 0 5px;
`

const KingSpan = styled.span`
font-size: 14px;
font-style: italic;
float: right;
color: var(--cFont);
padding: 0 5px;
`

const TextDiv = styled.div`
  text-align: ${props => props.textAlign};
  float: ${props => props.align || 'none'};
  font-weight: 400;
  padding: 0 5px
  width: calc(100% - 41px)
`

const FiltersSpan = styled.span`
  font-weight: 400;
  padding: 0 5px;
  user-select: none;

  &.active-filter {
    color: var(--cActiveFilter);
  }

  &:hover {
    cursor: pointer;
  }
`

const WinnerSpan = styled.span`
  text-align: ${props => props.textAlign};
  color: ${({ winner }) => winner ? 'var(--TeamsColorWin)' : 'var(--TeamColorLoss)'};
  font-weight: 400;
  order: ${({ winner }) => winner ? '1' : '3'};
`

const StatsSpan = styled.span`
  color: ${({ positive }) => positive ? 'var(--TeamsColorWin)' : 'var(--TeamColorLoss)'};
  font-weight: 400;
`

const BattleLabel = styled.span`
  order: 2;
`

const FiltersBlock = styled.div`
  width: 100%;
  font-size: 18px;
  overflow-wrap: break-word;
`

const StyledHyperLink = styled.a`
  text-decoration: none;
  padding: 5px;
  color: var(--cFont);

  span {
    font-size: 10px;
  }
`

export {
  Title, Subtitle, TextSpan, KingSpan, TextDiv, WinnerSpan, BattleLabel,
  FiltersBlock, FiltersSpan, StyledHyperLink, StatsSpan,
}
