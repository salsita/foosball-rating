import styled from 'styled-components';
import variables from './../variables';

const bgPat = require('./../../media/bgPat-1.png');

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 50px;
  background: ${variables.cYellow};
`

const Container = styled.div`
  max-width: ${variables.MaxWidth};
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
  background: #333 url(${bgPat}) 0 0 repeat scroll;
  color: ${variables.cGrey};
  padding: ${variables.baseSpacing};
  padding-top: 50px; 

`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.Column};
`

const Box = styled.div`
  display: ${props => props.Display};
  margin: ${props => props.Margin};
  padding: ${props => props.Padding};
`

export { Nav, Container, GridContainer, Box };
