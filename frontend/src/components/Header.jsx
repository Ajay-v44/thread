import React from "react";
import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import UserAtom from "../atoms/UserAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(UserAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        boxShadow="md"
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />

      {user && (
        <Link as={RouterLink} to={`/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </Flex>
  );
};
