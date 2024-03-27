import React from "react";
import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb="12">
      <Image
      
      boxShadow='md'
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
      />
    </Flex>
  );
};
