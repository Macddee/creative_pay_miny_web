import React from 'react';
import styled from 'styled-components';

const Small = styled.h3`
    font-family:${props => props.theme.fam.avebold};
    color:${props => props.theme.color.blue};
    font-weight:900;
    font-size:35px;
`

function HeadingSmall({children}) {
    return (
        <Small>
            {children}
        </Small>
    )
}

export default HeadingSmall
