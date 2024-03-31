import React, { useEffect } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useState } from "react";
import Actions from "./Actions";
import axios from "axios";
const PostS = ({ post, postedBy }) => {
  const [data, setdata] = useState(null);
  const [liked, setliked] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/getprofile/${postedBy}`);
        if (res.status === 200) {
          setdata(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [postedBy]);
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark Zuckerberg" src={data?.profilepic} />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right="-5px"
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John doe"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left="4px"
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {data?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setliked={setliked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {post.replies.length} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default PostS;
