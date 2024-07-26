import React from "react";
import HeadingSmall from "../../styled/HeadingSmall";
import Paragraph from "../../styled/Paragraph";
import SectionWrapper from "../../styled/SectionWrapper";

function Scanning() {
  return (
    <SectionWrapper imageName="scanner2.jpg">
      <div className="item-inner">
        <HeadingSmall>A feature </HeadingSmall>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, in.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est velit voluptates odit facere.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex rem vero debitis dignissimos odio.
        </Paragraph>
      </div>
      <div className="item-inner">
        <HeadingSmall>Another feature</HeadingSmall>
        <Paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo saepe nobis qui, eligendi harum vitae architecto placeat nostrum iste corporis. Fugiat assumenda accusamus possimus sed cupiditate eos sunt, voluptatum obcaecati.
        </Paragraph>
      </div>
    </SectionWrapper>
  );
}

export default Scanning;
