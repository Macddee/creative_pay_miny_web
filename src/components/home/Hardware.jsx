import React from 'react';
import styled from 'styled-components';

const WrapperHard = styled.section`
    padding:5%;
    background:linear-gradient(to bottom, #0000006f, #0000006f),url("./assets/hardware.jpg");
    background-size:contain;
    text-align:center;

    @media(min-width:768px){
        padding: 3% 10%;
    }
    @media(min-width:992px){
        padding: 3% 20% 15%;
    }
    h5{
        font-size:30px;
        font-family:${props => props.theme.fam.cera};
        color:#ffffff;
        @media(min-width:768px){
            font-size:48px;
            
        
        }
        br{
            display:none;
            @media(minw-dith:768px){
                display:block;
            }
        }
    }
    
`

function Hardware() {
    return (
        <WrapperHard>
            <h5>Managed and Inhouse Payroll Services for <br />any business</h5>
        </WrapperHard>
    )
}

export default Hardware
