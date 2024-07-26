import React from "react";
import styled from "styled-components";
import Paragraph from "../../styled/Paragraph";

const BcozWrapper = styled.section`
  padding:5%;
  @media(min-width:768px){
    padding:10% 15%;
  }
  .top{
    @media(min-width:768px){
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    img{
      width:100%;
      max-width:200px;
      margin:0 auto;
      display:block;

    }
  }
  .bottom{
    p{
      
      margin-bottom:20px;
    }
  }
  .img{
    width:100%;
    max-width:350px;
    margin:20px auto;
    display:block;
    @media(min-width:768px){
      max-width:100%;
      
    }
  }
`;

function Because() {
  return (
    <BcozWrapper>
      <div className="top">
        <Paragraph> 
          Access to managed or inhouse payroll services should be a fundamental right for every business out in the world, either for its a small or medium enterprise.
          <br /> <br /> 
          This is made possible by a software that is custom made for companies that have complex and huge payroll methods. Companies choose how to pay their emplpoyee's salaries, and we provide at Creative HR Solutions with our new and polished payroll system Creative Pay.
        </Paragraph><img src="./assets/creative pay logo.png" alt="" />  
      </div> 
        <img className="img" src="./assets/because.jpg" alt="" />
      <div className="bottom">
        <Paragraph>In order to ensure a seamless transition, Creative Pay provides both managed payroll solutions and on premise servers.</Paragraph>
      </div>
    </BcozWrapper>
  );
}

export default Because;
