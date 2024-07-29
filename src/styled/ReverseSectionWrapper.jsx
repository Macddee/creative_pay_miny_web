import React from "react";
import styled from "styled-components";
import Heading from "./Heading";

const WrapperReverse = styled.section`
  padding: 5%;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .inner {
      width: 45%;
    }
  }
  @media (min-width: 992px) {
    align-items: flex-end;
    padding: 10% 5%;
    &:before {
      content: "";
      height: 60%;
      width: 130px;
      background: ${(props) => props.theme.color.blue};
      position: absolute;
      top: 25%;
      right: 11%;
    }
  }

  img {
    width: 30vw;
    height: 70vh;
    border-radius: 10px;
    object-fit: cover; /* This will ensure that your image covers the full width and height specified, potentially cropping the image */
    @media (min-width: 700px) {
      border-radius: unset;
      width: 45vw;
    }

    @media (min-width: 992px) {
      transform: translate(-40%, -25px);
      width: 40vw;
    }
    @media (min-width: 1200px) {
      width: 30vw;
      transform: translate(-40%, -73px);
    }
  }
  h2 {
    transform-origin: 0 0;
    position: absolute;
    top: 5%;
    left: 30%;
    width: max-content;
    font-size: 50px;
    display:none;
    z-index: -1;
    @media (min-width: 768px) {
      font-size: 35px;
      display:block
      left: 5%;
      top: 100%;
      transform: rotate(-90deg);
    }
    @media (min-width: 992px) {
      top: 60%;
      z-index: 4;
      font-size: 36px;
    }
    @media (min-width: 1200px) {
      left: 10%;
    }
  }
  .inner {
    @media (min-width: 1200wpx) {
      background: #ffffff;
      padding: 6% 8% 0;
      z-index: 2;
    }
    @media (min-width: 1200px) {
      max-width: 400px;
      padding: 8% 6% 10% 6%;
      transform: translateX(30%);
    }
  }
  .item-inner {
    margin-bottom: 30px;
  }
`;

function ReverseSectionWrapper({ imageName, children }) {
  return (
    <WrapperReverse>
    
      <div className="inner">{children}</div>
     
      <img src={`./assets/${imageName}`} alt="" />
    </WrapperReverse>
  );
}

export default ReverseSectionWrapper;
