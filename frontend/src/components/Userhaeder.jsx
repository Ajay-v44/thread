import React, { useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilState } from "recoil";
import UserAtom from "../atoms/UserAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
const Userhaeder = ({ user }) => {
  const currentUser = useRecoilState(UserAtom);
  const toast = useShowToast();
  const [following, setfollowing] = useState(
    user.followers.includes(currentUser[0]._id)
  );
  const copyURL = () => {
    const currenturl = window.location.href;
    navigator.clipboard.writeText(currenturl).then(() => {
      toast("URL COPIED.", "We've copied url for you.", "success");
    });
  };
  const handleFollowUnFollow = async () => {
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast("Notification", data.message, "success");
      if (following) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser._id);
      }
      setfollowing(!following);
    } catch (err) {
      console.log(err);
      toast("Error", "Something Went Wrong", "error");
    }
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Flex gap={"2"} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.name}</Text>
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
          <Avatar
            name="M"
            src={
              user.profilepic
                ? user.profilepic
                : "https://imgs.search.brave.com/TL9zIvV8f9I0ZRlalApWDmlHrvi2m12tvTInBfShM4g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5EVXdNRFEy/TkRjdE9HTm1PUzAw/WldGbExXRTVPR010/WlRNellUTXpaREJt/TTJSalhrRXlYa0Zx/Y0dkZVFWUm9hWEpr/VUdGeWRIbEpibWRs/YzNScGIyNVhiM0py/Wm14dmR3QEAuX1Yx/X1FMNzVfVVg1MDBf/Q1IwLDAsNTAwLDI4/MV8uanBn"
            }
            size={{ base: "md", md: "xl" }}
          />
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser[0]._id == user._id ? (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>update profile</Button>
        </Link>
      ) : (
        <Button onClick={handleFollowUnFollow}>
          {following ? "UnFollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gary.light"}>{user.followers.length} followers</Text>
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
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Userhaeder;
