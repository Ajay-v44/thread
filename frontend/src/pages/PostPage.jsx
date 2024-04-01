import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import useGetuser from "../hooks/useGetuser";
import useGetSinglePost from "../hooks/useGetSinglePost";

const PostPage = () => {
  const { Loading, user } = useGetuser();
  const { Fetchpost, post } = useGetSinglePost();
  if (!user && Loading) {
    <Flex justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>;
  }
  return (
    <>
      {" "}
      {Fetchpost && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!Fetchpost && (
        <>
          <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
              <Avatar src={user.profilepic} size={"md"} />
              <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {user?.username}
                </Text>
                <Image src="/verified.png" w={4} ml={4} />
              </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                id
              </Text>
              <BsThreeDots cursor={"pointer"} />
            </Flex>
          </Flex>
          <Text my={3} mt={5} textAlign={"justify"} fontSize={"sm"}>
            {post?.text}
          </Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={post?.img} w={"full"} />
          </Box>
          <Flex gap={3} my={3}>
            <Actions post={post ? post : null} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              2138 replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {200} likes
            </Text>
          </Flex>
          <Divider my={4} />
          <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"2xl"}>👋</Text>
              <Text color={"gray.light"}>
                Get the app to like, reply and post.
              </Text>
            </Flex>
            <Button>Get</Button>
          </Flex>
          <Divider my={4} />
          <Comment
            comment="Looks really good"
            createdAt="2d"
            likes={100}
            userName="ram"
            avatar="https://bit.ly/ryan-florence"
          />
        </>
      )}
    </>
  );
};

export default PostPage;
