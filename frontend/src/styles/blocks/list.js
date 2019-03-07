import styled from 'styled-components';
import variables from './../variables';

const ListCon = styled.ul`
  margin: ${variables.baseSpacing};
  padding: 0;
  text-align: center;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.12),0 7px 10px -5px rgba(0,0,0,0.15);
  border-radius: 8px;
  background: #fff;
`

const ListItem = styled.li`
  padding: ${variables.baseSpacing};
  display: ${props => props.Display};
  grid-template-columns: ${props => props.Column};
  list-style: none;
  border-bottom: 1px solid ${variables.bgColor};

  :last-child {
    border-bottom: none;
  }
`

export { ListCon, ListItem};
