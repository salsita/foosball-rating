import styled from 'styled-components';
import variables from './../variables';

const Container = styled.div`
  max-width: ${variables.MaxWidth};
  margin: 0 auto;
  text-align: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.Column};
`
export { Container, GridContainer };
