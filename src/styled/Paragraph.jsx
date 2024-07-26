import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
    font-family:${props => props.theme.fam.avenir};
    font-size:17px;
    line-height:1.3;
`

function Paragraph({children}) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Paragraph
