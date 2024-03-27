import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
const Userhaeder = () => {
  const toast = useToast();
  const copyURL = () => {
    const currenturl = window.location.href;
    navigator.clipboard.writeText(currenturl).then(() => {
      toast({
        title: "URL COPIED.",
        description: "We've copied url for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Marck ZucerBurg
          </Text>
          <Flex gap={"2"} alignItems={"center"}>
            <Text fontSize={"sm"}>markZuckerBerg</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="M" src="/zuck-avatar.png" size={"xl"} />
        </Box>
      </Flex>
      <Text>Co founder of facebook chairman of meta</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gary.light"}>3.2m followers</Text>
          <Box w={"1"} h={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>Instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container" pl={2}>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
    </VStack>
  );
};

export default Userhaeder;
