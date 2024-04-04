import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
const CircularProgressCircle = ({ value }) => {
  return (
    <>
      <CircularProgress value={value} color="green.400" >
        <CircularProgressLabel fontSize={"xs"}>{value}%</CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default CircularProgressCircle;
