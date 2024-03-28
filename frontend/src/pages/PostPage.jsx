import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setliked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Mark ZuckerBerg
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
        exercitationem aliquam est vel eum, labore consectetur soluta voluptatum
        modi natus ut repudiandae laudantium, ipsam laborum aliquid pariatur.
        Natus, quos voluptate!
      </Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/post1.png" w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setliked={setliked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          2138 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
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
  );
};

export default PostPage;
