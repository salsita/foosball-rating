import React, { Component } from 'react';

// components pure html
import {
    Title, Subtitle
} from './../../styles/blocks/';

class Header extends Component {
    render() {
        return(
            <div>
                <Title>
                    Logo
                </Title>
                <Subtitle>
                    Powered by Salsita
                </Subtitle>
            </div>
        )
    }
}

export default Header;