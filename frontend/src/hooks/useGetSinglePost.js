import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useParams } from "react-router-dom";
import axios from "axios";

const useGetSinglePost = () => {
  const [post, setSPost] = useState(null);
  const [Fetchpost, setFetchPost] = useState(true);
  const toast = useShowToast();
  const { pid } = useParams();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/api/post/getpost/${pid}`);
        setSPost(res.data);
      } catch (err) {
        toast("User Not Found", "User dont exits", "error");
        console.log(err);
      } finally {
        setFetchPost(false);
      }
    };
    getPosts();
  }, [pid]);
 
  return { Fetchpost, post };
};

export default useGetSinglePost;
