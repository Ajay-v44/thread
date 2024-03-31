"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import AuthScreenAction from "../atoms/AuthScreenAction";
import useShowToast from "../hooks/useShowToast";
import UserAtom from "../atoms/UserAtom";

// 4:2
export default function LoginCard() {
  const [Loading, setLoading] = useState(false);
  const toast = useShowToast();
  const [showPassword, setShowPassword] = useState(false);
  const setuser = useSetRecoilState(UserAtom);
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });
  const setAuthScreen = useSetRecoilState(AuthScreenAction);

  const handlelogin = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      toast("Notification", data.message, "info");
      localStorage.setItem("user-threads", JSON.stringify(data.data));
      setuser(data.data);
      setinputs({
        username: "",
        password: "",
      });
    } catch (err) {
      toast("ERROR", "Something went wrong", "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome Back✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>UserName</FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setinputs({ ...inputs, username: e.target.value });
                }}
                value={inputs.username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setinputs({ ...inputs, password: e.target.value });
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging In"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handlelogin}
                isLoading={Loading}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not a user?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => {
                    setAuthScreen("signup");
                  }}
                >
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
