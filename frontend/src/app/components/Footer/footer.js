import React from 'react';

const style = {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    margin: 20,
}

const linkStyle = {
    color: 'white',
}

export const Footer = () => (
    <div style={style}>
        <span>Sources available at: </span> 
        <a style={linkStyle} href="https://github.com/salsita/foosball-rating/">
            https://github.com/salsita/foosball-rating/
        </a> 
    </div>
)


