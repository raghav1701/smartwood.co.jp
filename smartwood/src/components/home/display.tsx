"use client";

import ComingSoon from "react-coming-soon";
import { Box, styled } from "@mui/material";

const Root = styled(Box)`
  font-family: "Roboto, sans-serif";
  text-align: center;
`;

const Display = () => {
  return (
    <Root>
      <ComingSoon
        title="We are left with few things"
        subtitle="See you in"
        bgColor="#2A2A29"
        textColor="#FF7133"
        date="Mon Oct 9 2023 17:00:00 GMT-0600 (Mountain Daylight Time)"
        illustration="web-development"
      />
    </Root>
  );
};

export default Display;
