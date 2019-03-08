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

export { Container, GridContainer, Box };
