import styled from 'styled-components'
import { variables } from './../variables'

const ListCon = styled.ul`
  margin: 10px auto 1rem auto;
  padding: 0;
  text-align: center;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.12),0 7px 10px -5px rgba(0,0,0,0.15);
  overflow: hidden;
  background: var(--cTheme);
  @media (min-width: ${variables.bpMedium}) {
    width: 450px;
  }

  &.topPlayers {
    li:nth-child(${props => props.ascending ? 0 : 1}),
    li:nth-last-child(${props => props.ascending ? 1 : 0})
    {
      font-size: 28px;
      color: var(--cTopPlayerGold);

      img {
        height: 26px;
      }
    }
    li:nth-child(${props => props.ascending ? 0 : 2}),
    li:nth-last-child(${props => props.ascending ? 2 : 0})
    {
      font-size: 22px;
      color: var(--cTopPlayerSilver);

      img {
        height: 26px;
      }
    }
    li:nth-child(${props => props.ascending ? 0 : 3}),
    li:nth-last-child(${props => props.ascending ? 3 : 0})
    {
      font-size: 18px;
      color: var(--cTopPlayerBronze);

      img {
        height: 26px;
      }
    }
  }
`

const ListItem = styled.li`
  padding: ${variables.baseSpacing};
  display: ${props => props.Display};
  grid-template-columns: ${props => props.Column};
  color: var(--cFont);
  list-style: none;
  border: 1px solid var(--cBorder);
  align-items: center;
  position: relative;

  &:nth-child(even) {
    background: var(--bgColorListSec);
  }
`

export { ListCon, ListItem }
