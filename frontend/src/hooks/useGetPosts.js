import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import axios from "axios";
import { useParams } from "react-router-dom";

const useGetPosts = () => {
  const { username } = useParams();
  const toast = useShowToast();
  const [posts, setposts] = useState([]);
  const [Fetchpost, setFetchPost] = useState(true);
  useEffect(() => {
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

    getPosts();
  }, [username]);
  return { posts, Fetchpost };
};

export default useGetPosts;
