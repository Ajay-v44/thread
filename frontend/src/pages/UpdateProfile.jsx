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

export default function UpdateProfile() {
  const { handleImageChange,imgUrl } = usePrevieimage();
  const [user, setuser] = useRecoilState(UserAtom);
  console.log(user);
  const [inputs, setinputs] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const filref = useRef(null);

  const handleOnclick = async () => {};
  return (
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
              <Avatar size="xl" src={imgUrl||user.profilepic}>
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
              <Input type="file" hidden ref={filref} onChange={handleImageChange}/>
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
        <FormControl id="bio" isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="hi this is ajay ..."
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="password" isRequired>
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
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
