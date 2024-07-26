import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Heading from "../../styled/Heading";
import { TextInput } from "flowbite-react";

const WrapperGet = styled.section`
    padding:5%;
    text-align:center;
   @media(min-width:992px){
       padding:5% 0;
   }
    h2{
        color:${props => props.theme.color.grey};
        font-family:${props => props.theme.fam.cera};
        font-size:35px;
        text-align:center;
    }
    img{
        width:100%;
        display:none;
    
 @media(min-width:992px){
     transform:translate(40%, -25px);
     width:40%;
     display:block;
 }
 @media(min-width:1200px){
     width:36%;
     transform:translate(40%, -8px);
 }
    }

    
    h4{
        font-family:${props => props.theme.fam.avebold};
        font-size:15px;
    }
    .links{
        display:flex;
        justify-content:space-between;
        margin:0 auto;
        max-width:350px;
        li{
            height:30px;
            width:30px;
            position:relative;
            padding:5px;
            border-radius:50%;
            border:2px solid ${props => props.theme.color.grey};
            list-style:none;
              a{
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            position:absolute;
            text-decoration:none;
            svg{
                color:#000000;
                height:20px;
                width:20px;
            }
        }
        }
      
    }
    .top{
        @media(min-width:992px){
            display:flex;
            justify-content:space-between;
            width:max-content;
            margin:0 auto;
            align-items:center;
            h4{
                margin:0 10px;
            }
            .links{
                li{
                height:20px;
                width:20px;
                margin-left:20px;
                a{
                    svg{
                        height:14px;
                        width:14px;
                    }
                }
            }
            }
            
        }
    }
    .contact{
        
        @media(min-width:992px){
        display:flex;
        position:relative;
        justify-content:space-between;
        align-items:flex-end;
        flex-direction:row-reverse;

            padding:10% 5%;
        &:before{
    content: "";
    height: 60%;
    width: 130px;
    background: ${props => props.theme.color.blue };
    position: absolute;
    top: 31%;
    left: 11%;
  }
    }
        form{
            margin:0 auto;
        margin-top:20px;
        max-width:100%;
        @media(min-width:568px){
            max-width:60%;
        }
        @media (min-width: 992px) {
      background: #ffffff;
      padding: 2% 3% 0;
    z-index: 2;
    width: 40%;
    text-align:left;
    margin:0;
    }
    @media(min-width:1200px){
        max-width:400px;
        transform: translateX(-30%);
    }
        .MuiFormControl-root{
            background: #C4C4C44D;
            margin-bottom:10px;
            width:100%;
            label{
                padding:0 5px;
            }
            .MuiInput-underline:after,.MuiInput-underline:before{
                border:none;
            }
        }
    }
    }
    button{
        margin:10px 0;
        width:150px;
        height:40px;
        background:${props => props.theme.color.blue};
        color:#ffffff;
        border:none;
        font-family:${props => props.theme.fam.avenir};
    }
`;

function GetInTouch() {
  return (
    <WrapperGet>
        <Heading>Get In Touch</Heading>
        <div className="top">
        <h4> info@creative.co.zw </h4>
      <h4>+263 XXXXXX</h4>
      <h4>+263 XXXXXX</h4>
      <div className="links">
          <li>
             <a href="#">
          <FaLinkedinIn />
        </a>  
          </li>
       <li>
            <a href="#">
          <FaFacebookF />
        </a>
       </li>
       <li>
           <a href="#">
          <FaInstagram />
        </a> 
       </li>
       <li>
            <a href="#">
          <FaYoutube />
        </a>
       </li>
       
      </div>
        </div>
    
      
    </WrapperGet>
  );
}

export default GetInTouch;
