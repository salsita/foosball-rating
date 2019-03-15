import React, { Component } from 'react';
import { Box, TextSpan, StyledHyperLink } from './../../../styles/blocks';

class Footer extends Component{
    render() {
        return(
            <Box>
                <StyledHyperLink href="https://github.com/salsita/foosball-rating/">
                    <TextSpan>Sources available at: github.com/salsita/foosball-rating</TextSpan> 
                </StyledHyperLink> 
            </Box>
        )
    }
}

export default Footer;
