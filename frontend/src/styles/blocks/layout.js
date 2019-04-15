import styled from 'styled-components';
import variables from './../variables';

const bgPat = require('./../../media/bgPat-1.png');

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 50px;
  background: ${variables.cYellow};
  text-align: center;

  h1 {
    margin-top: 10px;
    background: ${variables.cYellow};
    text-align: center;
  }
  button {
    float: right;
    width: auto;
    background: ${variables.cBlack};
    padding: 10px 15px;
    color: ${variables.cYellow};
    margin: 7px;
  }
`

const Container = styled.div`
  max-width: ${variables.MaxWidth};
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
  min-height: calc(100vh - 90px);
  background: #333 url(${bgPat}) 0 0 repeat scroll;
  color: ${variables.cGrey};
  padding: ${variables.baseSpacing};
  padding-top: 50px; 

`
const GridContainer = styled.div`
  display: grid;
  padding: ${props => props.Padding};
  grid-template-columns: ${props => props.Column};
`

const Box = styled.div`
  display: ${props => props.Display};
  margin: ${props => props.Margin};
  padding: ${props => props.Padding};
  background: ${variables.cBlack};
`
const ProfileDetail = styled.div`
  display: flex;
  margin: ${props => props.Margin};
  padding: ${props => props.Padding};
  justify-content: center;

  h2 {
    font-size: ${variables.fontSizeProfileDetails};
    padding: ${variables.baseSpacing};
  }
`

export { Nav, Container, GridContainer, Box, ProfileDetail };
