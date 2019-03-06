import styled from 'styled-components';
import variables from './../variables';

const Title = styled.h1`
    font-size: ${variables.fontSizeTitle};
    text-align: ${props => props.textAlign};
`
const Subtitle = styled.h2`
    font-size: ${variables.fontSizeSubtitle};
    text-align: ${props => props.textAlign};
`

const TextSpan = styled.span`
    text-align: ${props => props.textAlign};
    
`

export {Title, Subtitle, TextSpan};