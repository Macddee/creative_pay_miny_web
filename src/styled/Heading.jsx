import React from 'react';
import styled from "styled-components";

const WrapperHeading = styled.h2`
    color:${props => props.theme.color.grey};
    font-family:${props => props.theme.fam.cera};
`

function Heading({children}) {
    return (
        <WrapperHeading>
            {children}
        </WrapperHeading>
    )
}

export default Heading
