import React from "react";
import Userhaeder from "../components/Userhaeder";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import PostS from "../components/PostS";
import useGetuser from "../hooks/useGetuser";
import useGetPosts from "../hooks/useGetPosts";
import CreatePost from "../components/CreatePost";

const UserPage = () => {
  const { Loading, user } = useGetuser();
  const { posts, Fetchpost } = useGetPosts();
  if (!user && Loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !Loading) return <h1>User Not Found</h1>;
  return (
    <>
      <Userhaeder user={user} />
      {!Fetchpost && posts.length === 0 && (
        <Button>User Haven't Posted Anthing</Button>
      )}
      {Fetchpost && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post, id) => (
        <PostS key={id} post={post} postedBy={post.postedBy} />
      ))}
      <CreatePost />
    </>
  );
};

export default UserPage;
