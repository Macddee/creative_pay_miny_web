/* eslint-disable no-unused-vars */
import React from "react";
import HeadingSmall from "../../styled/HeadingSmall";
import Paragraph from "../../styled/Paragraph";
import ReverseSectionWrapper from "../../styled/ReverseSectionWrapper";

function Employ() {
  return (
    <ReverseSectionWrapper imageName="payment.jpg">
      <div className="item-inner">
        <HeadingSmall>Lorem ipsum dolor sit.</HeadingSmall>
        <Paragraph>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam et nesciunt non quasi tenetur fugiat. Vero delectus cupiditate cum fugit dolores autem tenetur explicabo. Ut molestias nisi iusto incidunt pariatur!
        </Paragraph>
      </div>
      <div className="item-inner">
        <HeadingSmall>Some heading for the system</HeadingSmall>
        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum beatae quo voluptatum exercitationem nisi ad itaque, numquam, assumenda labore suscipit corrupti atque ex deserunt harum, dolorum ut ipsam. Quos aperiam sit ullam. Earum, saepe aspernatur id eius fuga nam!
        </Paragraph>
      </div>
    </ReverseSectionWrapper>
  );
}

export default Employ;
