import React, { useState } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({ userName, createdAt, comment, avatar, likes }) => {
  const [liked, setLiked] = useState(false);
  const likesCount = liked ? 1 : 0;
  return (
    <div>
      <Flex gap={4} my={2} w="full">
        <Avatar src={avatar} size="sm" />
        <Flex gap={1} w="full" flexDirection="column">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {userName}
            </Text>
            <Flex gap={2} alignItems="center">
              <Text>{createdAt} day</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>
            {comment}
            <Actions liked={liked} setLiked={setLiked} />
            <Text fontSize="sm" color="gray.light">
              {likes + likesCount} likes
            </Text>
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default Comment;
