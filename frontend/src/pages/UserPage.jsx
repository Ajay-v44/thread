import React, { useEffect, useState } from "react";
import Userhaeder from "../components/Userhaeder";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import PostS from "../components/PostS";

const UserPage = () => {
  const toast = useShowToast();
  const [user, setuser] = useState(null);
  const { username } = useParams();
  const [Loading, setLoading] = useState(true);
  const [Fetchpost, setFetchPost] = useState(true);
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`/api/users/getprofile/${username}`);
        setuser(res.data);
      } catch (err) {
        toast("User Not Found", "User dont exits", "error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    const getPosts = async () => {
      try {
        const res = await axios.get(`/api/users/user/${username}`);
        setposts(res.data.post);
      } catch (err) {
        toast("User Not Found", "User dont exits", "error");
        console.log(err);
      } finally {
        setFetchPost(false);
      }
    };
    getuser();
    getPosts();
  }, [username]);
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
      {!Fetchpost && posts?.length === 0 && (
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
    </>
  );
};

export default UserPage;
