import styled from 'styled-components';
import variables from './../variables';

const ListCon = styled.ul`
  margin: ${variables.baseSpacing};
  padding: 0;
  text-align: center;
`

const ListItem = styled.li`
  padding: ${variables.baseSpacing};
  display: ${props => props.Display};
  grid-template-columns: ${props => props.Column};
  list-style: none;
`

export { ListCon, ListItem};
