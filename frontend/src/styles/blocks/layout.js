import styled from 'styled-components'
import { variables } from './../variables'

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 50px;
  background: var(--cYellow);
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  font-size: 16px
  #title {
    display: flex;
    flex: 1;
    justify-content: start;
    align-items: center;
    font-size: 1.7em;
    @media (max-width: ${variables.bpSmall}) {
      font-size: 1.4em;
    }
    padding-bottom: 3px;
  }
  #theme {
    padding: 8px;
    display: flex;
    width: auto;
    svg {
      height: 1.5em;
      width: 1.5em;
      font-size: inherit;
    }
  }
  button {
    padding: 2px 10px 0px 10px;
    width: auto;
    background: var(--cTheme);
    margin: 5px;
    font-size: inherit;
  }
`

const Container = styled.div`
  max-width: ${variables.MaxWidth};
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
  min-height: calc(100vh - 90px);
  background: #333 var(--bgPat) 0 0 repeat scroll;
  color: var(--cFont);
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
  background: var(--cTheme);
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

export { Nav, Container, GridContainer, Box, ProfileDetail }
