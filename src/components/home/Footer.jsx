/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Paragraph from '../../styled/Paragraph';
import moment from 'moment'
import styled from "styled-components";

const FooterWrapper = styled.section`
    padding:5%;
    background:${props => props.theme.color.blue};
    color:#ffffff;
    @media(min-width:768px){
        padding:20px 5%;
        .last{
            width:max-content;
            display:flex;
            justify-content:space-between;
            margin:0 auto;
            li{
                padding:20px;
            }
        }
        p{
            text-align:center;
        }
    }
    @media(min-width:992px){
        display:flex;
        flex-direction:row-reverse;
        align-items:center;
        justify-content:space-between;
        .last{
            margin-right:0;
        }
    }
    .last{
        
        li{
            list-style:none;
            width:max-content;
            padding:20px 20px 20px 0;
            a{
                text-decoration:none;
                color:#ffffff;
                font-family:${props => props.theme.fam.avenir};
            }
        }
    }
`

function Footer() {
    const year = moment().year()
    return (
        <FooterWrapper>
            <div className="last">
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Key Features & Benefits</a>
                </li>
                <li>
                    <a href="#">Our Partners</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </div>
            <Paragraph>Copyright© {year} Creative HR Solutions <br />93 Lomagundi Road Avondale West (Corner Aloe Way)</Paragraph>
            {/* <Paragraph>93 Lomagundi Road Avondale West (Corner Aloe Way)</Paragraph> */}
        </FooterWrapper>
    )
}

export default Footer
