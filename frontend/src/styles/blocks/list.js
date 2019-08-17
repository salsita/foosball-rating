import styled from 'styled-components';
import variables from './../variables';

const ListCon = styled.ul`
  margin: 10px auto 1rem auto;
  padding: 0;
  text-align: center;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.12),0 7px 10px -5px rgba(0,0,0,0.15);
  overflow: hidden;
  background: ${variables.cBlack};
  @media (min-width: ${variables.bpMedium}) {
    width: 450px;
  }

  &.topPlayers {
    li:nth-child(1) {
      font-size: 28px;
      color: ${variables.cTopPlayerGold}
    }
    li:nth-child(2) {
      font-size: 22px;
      color: ${variables.cTopPlayerSilver}
    }
    li:nth-child(3) {
      font-size: 18px;
      color: ${variables.cTopPlayerBronze}
    }
  }
`

const ListItem = styled.li`
  padding: ${variables.baseSpacing};
  display: ${props => props.Display};
  grid-template-columns: ${props => props.Column};
  color: ${variables.cGrey};
  list-style: none;
  border: 1px solid ${variables.cDarkGray};
  align-items: center;

  &:nth-child(even) {
    background: ${variables.bgColorListSec};
  }
`

export { ListCon, ListItem};
