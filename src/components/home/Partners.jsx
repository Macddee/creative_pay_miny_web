import React from "react";
import styled from "styled-components";

const PartnerWrappper = styled.section`
  padding-top: 5%;
  height: 100vh;
  @media (min-width: 768px) {
    height: 660px;
  }
  @media (min-width: 1200px) {
    height: 100vh;
  }
  h2 {
    color: ${(props) => props.theme.color.grey};
    font-family: ${(props) => props.theme.fam.cera};
    font-size: 50px;
    text-align: center;
  }
  .imgs {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    max-width: 350px;
    // height: 500px
    margin: 0 auto;
    img {
      width: 45%;
    }
  }
  .bottom {
    height: 70%;
    width: 100%;
    background: url("./assets/payment.jpg");
    background-size: cover;
  }
`;

function Partners() {
  return (
    <PartnerWrappper>
      <h2>Our Partners</h2>

      <div className="imgs">
          {" "}
          <img src="/assets/creative pay logo.png" alt="" />
        
          <img src=".assets/for.jpg" alt="" />  
      </div>
      <div className="bottom"></div>
    </PartnerWrappper>
  );
}

export default Partners;
