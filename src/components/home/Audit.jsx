import React from "react";
import HeadingSmall from "../../styled/HeadingSmall";
import Paragraph from "../../styled/Paragraph";
import ReverseSectionWrapper from "../../styled/ReverseSectionWrapper";


function Audit() {
  return (
    <ReverseSectionWrapper imageName="audit.jpg">
      <div className="item-inner">
        <HeadingSmall>Employee Management</HeadingSmall>
        <Paragraph>
          You can have control over which team members have access to the system
          and assign different sets of permissions to different roles in your
          store.
        </Paragraph>
      </div>
      <div className="item-inner">
        <HeadingSmall>Audit Trail</HeadingSmall>
        <Paragraph>
          The system provides a detailed, chronological record whereby
          accounting records, project details and other financial data will be
          tracked and traced.
        </Paragraph>
      </div>
    </ReverseSectionWrapper>
  );
}

export default Audit;
