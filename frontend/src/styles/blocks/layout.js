import styled from 'styled-components';
import variables from './../variables';

const Container = styled.div`
  max-width: ${variables.MaxWidth};
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
  color: ${variables.cWhite};
  padding: ${variables.baseSpacing};

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

const Card = styled.div`
  padding: ${variables.baseSpacing};
  border-radius: 8px;
  background: ${variables.cWhite};
  display: inline-block;
  color: ${variables.cBlack};

`


export { Container, GridContainer, Box, Card };
