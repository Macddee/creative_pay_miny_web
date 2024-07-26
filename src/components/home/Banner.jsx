import React from 'react'
import styled from 'styled-components';


const Wrapper = styled.section`
    background:linear-gradient(to bottom, #0000006f, #0000006e), url("./assets/baner.jpg");
    background-size:cover;
    background-position:center center;
    height:100vh;
    display: flex; /* Use flexbox to center the image */
    justify-content: center; /* Center the image horizontally */
    align-items: center; /* Center the image vertically */
    @media(min-width:768px){
        height:660px;
    }
    @media(min-width:1200px){
        height:100vh;
    }
    img{
        margin:auto;
        width:200px;
        background: white; /* Give the image a white background */
    }
    .text {
        color: white; /* Make the text white */
        font-size: 2.5em; /* Make the text large */
        text-align: center; /* Center the text */
        background: rgba(255, 255, 255, 0.5); /* Semi-transparent white background to help the text blend with the image */
        padding: 15px; /* Add some padding around the text */
        border-radius: 5px;
        line-height:1.5 /* Round the corners of the background */
    }
`;


function Banner() {
    return (
        <Wrapper className=''>
            <div className="text">Welcome to CreativePay, <br /> Where your Payrolls Matter!</div>
        </Wrapper>
    )
}

export default Banner
