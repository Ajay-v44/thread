"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import UserAtom from "../atoms/UserAtom";
import usePrevieimage from "../hooks/usePrevieimage";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfile() {
  const toast = useShowToast();
  const { handleImageChange, imgUrl } = usePrevieimage();
  const [user, setuser] = useRecoilState(UserAtom);
  const [inputs, setinputs] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    bio: user.bio,
    password: "",
  });

  const filref = useRef(null);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/users/update/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
        });
        const data = await res.json(); 
        
        setuser(data.data)
       toast("Updated",data.data.message,"success")
    } catch (err) {
      toast("Notification", "Something Went Wrong", "error");
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <Flex>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>Update Avatar</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || user.profilepic}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => filref.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={filref}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Ajay"
              value={inputs.name}
              onChange={(e) => {
                setinputs({ ...inputs, name: e.target.value });
              }}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              value={inputs.username}
              onChange={(e) => {
                setinputs({ ...inputs, username: e.target.value });
              }}
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              value={inputs.email}
              onChange={(e) => {
                setinputs({ ...inputs, email: e.target.value });
              }}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="hi this is ajay ..."
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={inputs.bio}
              onChange={(e) => {
                setinputs({ ...inputs, bio: e.target.value });
              }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={inputs.password}
              onChange={(e) => {
                setinputs({ ...inputs, password: e.target.value });
              }}
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              type="reset"
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
