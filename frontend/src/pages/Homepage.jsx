import axios from "axios";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

import { Button, Flex, Spinner } from "@chakra-ui/react";
import PostS from "../components/PostS";

const Homepage = () => {
  const toast = useShowToast();
  const [Loading, setLoading] = useState(true);
  const [Post, setPosts] = useState([]);
  useEffect(() => {
    const getfeedPosts = async () => {
      try {
        const res = await axios.get("/api/post/feed");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        toast("Error", "Something went Wrong", "error");
      } finally {
        setLoading(false);
      }
    };
    getfeedPosts();
  }, []);
  return (
    <>
      {Loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!Loading && Post.length === 0 && (
        <Button>Follow some users to see the feed</Button>
      )}
      {Post.map((post, index) => (
        <PostS key={index} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  );
};

export default Homepage;
