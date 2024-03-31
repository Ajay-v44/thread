import React, { useEffect, useState } from "react";
import Userhaeder from "../components/Userhaeder";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const toast = useShowToast();
  const [user, setuser] = useState(null);
  const { username } = useParams();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`/api/users/getprofile/${username}`);
        console.log(res.data);
        setuser(res.data);
      } catch (err) {
        toast("User Not Found", "User dont exits", "error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getuser();
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
      <UserPost
        likes={123}
        replies={20}
        postImg="/post1.png"
        postTitle="Lets talk about stock market"
      />
      <UserPost
        likes={223}
        replies={10}
        postImg="/post2.jpeg"
        postTitle="Lets talk about stock market"
      />
      <UserPost
        likes={323}
        replies={50}
        postImg="/post3.png"
        postTitle="Lets talk about stock market"
      />
    </>
  );
};

export default UserPage;
