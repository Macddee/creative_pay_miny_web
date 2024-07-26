import React from "react";
import HeadingSmall from "../../styled/HeadingSmall";
import Paragraph from "../../styled/Paragraph";
import SectionWrapper from "../../styled/SectionWrapper";


function Multi() {
  return (
    <SectionWrapper imageName="multi2.jpg">
      
      <div className="item-inner">
        <HeadingSmall> Integrated Payroll Methods </HeadingSmall>
        <Paragraph>
          Creative Pay's payroll solutions are the best rated payroll methods in Zimbabwe with a staggering 
        </Paragraph>
      </div>
      <div className="item-inner">
        <HeadingSmall>Payroll managment</HeadingSmall>
        <Paragraph>
          Optimize your payroll for your business' needs and leave the rest to us.
          Our efficient licencing will connect you and your coworkers systems seamlessly
          and keep you from paying extra.
        </Paragraph>
      </div>
    </SectionWrapper>
  );
}

export default Multi;
