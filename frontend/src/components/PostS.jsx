import React, { useEffect } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import Actions from "./Actions";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import UserAtom from "../atoms/UserAtom";
import useShowToast from "../hooks/useShowToast";
const PostS = ({ post, postedBy }) => {
  const toast = useShowToast();
  const currentuser = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [data, setdata] = useState(null);
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
  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are You sure You Want to deleet this post")) return;
    try {
      const res = await axios.delete(`/api/post/delete/${post._id}`);
      toast("Deleted", res.data.message, "warning");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link to={`/${data?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name="Mark Zuckerberg"z
            src={data?.profilepic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${data.username}`);
            }}
          />
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
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${data.username}`);
                }}
              >
                {data?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                textAlign={"right"}
                w={36}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentuser?._id === data?._id && (
                <DeleteIcon onClick={handleDeletePost} />
              )}
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
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default PostS;
